const API_BASE = "http://localhost:5678/api";
const token = localStorage.getItem("token");
const divGallery = document.querySelector(".gallery");
const btnAddPhoto = document.getElementById("file");

// === UTILS === //
const fetchData = (endpoint) => fetch(`${API_BASE}/${endpoint}`).then(res => res.json());
const setDisplay = (el, display) => { el.style.display = display };

// === GÉNÉRATION DE LA GALERIE === //
function renderGallery(works) {
  divGallery.innerHTML = "";
  works.forEach(work => {
    const figure = document.createElement("figure");
    figure.dataset.categoryId = work.categoryId;

    figure.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    `;
    divGallery.appendChild(figure);
  });
}

// === FILTRES DYNAMIQUES === //
function renderFilters(categories) {
  const divContent = document.querySelector(".contentFiltrers");
  setDisplay(divContent, "flex");
  divContent.innerHTML = "";

  const allFilter = createFilter("", "Tous");
  divContent.appendChild(allFilter);

  categories.forEach(({ id, name }) => {
    const filter = createFilter(id, name);
    divContent.appendChild(filter);
  });

  addFilterListeners();
}

function createFilter(id, label) {
  const div = document.createElement("div");
  div.className = "filtres";
  div.dataset.categoryId = id;

  const p = document.createElement("p");
  p.innerText = label;
  div.appendChild(p);
  return div;
}

function addFilterListeners() {
  document.querySelectorAll(".filtres").forEach(filter => {
    filter.addEventListener("click", () => {
      const id = filter.dataset.categoryId;
      id ? fetchFilteredWorks(id) : fetchWorks();
    });
  });
}

function fetchWorks() {
  fetchData("works").then(renderGallery);
}

function fetchFilteredWorks(categoryId) {
  fetchData("works").then(works => {
    const filtered = works.filter(w => w.categoryId == categoryId);
    renderGallery(filtered);
  });
}

function fetchCategories() {
  fetchData("categories").then(renderFilters);
}

// === MODALE ADMIN === //
function renderModalPhotos(works) {
  const container = document.querySelector(".photos");
  container.innerHTML = "";

  works.forEach((work, index) => {
    const div = document.createElement("div");
    div.style.backgroundImage = `url(${work.imageUrl})`;
    div.id = `divWork_${index}`;

    const delIcon = document.createElement("i");
    delIcon.className = "fa-solid fa-trash-can";
    delIcon.id = `delete_${index}`;
    delIcon.addEventListener("click", () => deleteWork(work.id, div));

    div.appendChild(delIcon);
    container.appendChild(div);
  });
}

function deleteWork(id, element) {
  fetch(`${API_BASE}/works/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
  }).then(() => {
    element.remove();
    fetchWorks();
  });
}

function setupPreviewImage() {
  const preview = document.querySelector(".previewImage");
  const divFile = document.querySelector(".fileImage");

  btnAddPhoto.addEventListener("change", () => {
    const file = btnAddPhoto.files[0];
    if (file) {
      preview.innerHTML = `<img src="${URL.createObjectURL(file)}" style="width: 100%">`;
      setDisplay(btnAddPhoto, "none");
      setDisplay(divFile, "none");
      setDisplay(preview, "flex");
    }
  });
}

function resetForm() {
  document.querySelector(".previewImage").innerHTML = "";
  document.getElementById("tilteProject").value = "";
  document.getElementById("categorySelect").value = "";

  setDisplay(btnAddPhoto, "flex");
  setDisplay(document.querySelector(".fileImage"), "flex");
  setDisplay(document.querySelector(".previewImage"), "none");
}

function submitNewProject() {
  const file = btnAddPhoto.files[0];
  const title = document.getElementById("tilteProject").value;
  const category = document.getElementById("categorySelect").value;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);

  fetch(`${API_BASE}/works`, {
    method: "POST",
    headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    body: formData,
  }).then(() => {
    fetchWorks();
    closeModal();
    resetForm();
  });
}

// === UI EVENTS === //
function setupAdminUI() {
  const modifBtn = document.querySelector(".divModif");
  const popup = document.querySelector(".backgroundPopUp");
  const galleryPhoto = document.getElementById("galleryPhoto");
  const photoAdd = document.getElementById("photoAdd");
  const photosGallery = document.querySelector(".photos");

  modifBtn.addEventListener("click", () => {
    setDisplay(popup, "flex");
    setDisplay(galleryPhoto, "flex");
    fetchData("works").then(renderModalPhotos);
  });

  document.querySelector(".addPhoto").addEventListener("click", () => {
    setDisplay(galleryPhoto, "none");
    setDisplay(photoAdd, "flex");
    resetForm();
    setupPreviewImage();
  });

  document.getElementById("btnValidate").addEventListener("click", submitNewProject);

  document.getElementById("close1").addEventListener("click", closeModal);
  document.getElementById("close2").addEventListener("click", closeModal);

  document.querySelector(".fa-arrow-left").addEventListener("click", () => {
    setDisplay(galleryPhoto, "flex");
    setDisplay(photoAdd, "none");
    fetchData("works").then(renderModalPhotos);
  });

  document.querySelector(".logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    generationLogout();
    fetchCategories();
  });
}

function closeModal() {
  setDisplay(document.querySelector(".backgroundPopUp"), "none");
  setDisplay(document.getElementById("galleryPhoto"), "none");
  setDisplay(document.getElementById("photoAdd"), "none");
  fetchWorks();
}

// === INIT === //
if (!token) {
  generationLogout();
  fetchCategories();
} else {
  generationLogin();
  fetchWorks();
  setupAdminUI();
}
