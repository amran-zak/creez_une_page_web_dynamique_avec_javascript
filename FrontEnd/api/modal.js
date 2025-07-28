const token = localStorage.getItem("token");
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('modal-close');
const modal = document.getElementById('modal');
const overlay = document.getElementById('modal-overlay');
const galleryView = document.getElementById('modal-gallery-view');
const addView = document.getElementById('modal-add-view');
const switchToAddView = document.getElementById('switchToAddView');
const backToGallery = document.getElementById('backToGallery');
const modalGallery = document.getElementById('modal-gallery');
const adminBar = document.getElementById("admin-bar");

// 1. Afficher le bouton Modifier si connecté
if (token) {
  adminBar.style.display = "block";
}

// 2. Ouvrir la modale + charger les images
openModalBtn.addEventListener('click', async () => {
  modal.style.display = 'flex';
  galleryView.classList.add('active');
  addView.classList.remove('active');
  await loadModalGallery();
});

// 3. Fermer la modale
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

overlay.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 4. Changer de vue
switchToAddView.addEventListener('click', () => {
  galleryView.classList.remove('active');
  addView.classList.add('active');
});

backToGallery.addEventListener('click', () => {
  addView.classList.remove('active');
  galleryView.classList.add('active');
});

// 5. Charger les images dans la modale
async function loadModalGallery() {
  modalGallery.innerHTML = ""; // vider avant de recharger
  try {
    const res = await fetch("http://localhost:5678/api/works");
    const works = await res.json();

    works.forEach(work => {
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "×";
      deleteBtn.addEventListener("click", () => {
        deleteWork(work.id);
      });

      item.appendChild(img);
      item.appendChild(deleteBtn);
      modalGallery.appendChild(item);
    });
  } catch (e) {
    console.error("Erreur chargement galerie:", e);
  }
}

// 6. Supprimer un projet
async function deleteWork(id) {
  try {
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      await loadModalGallery(); // recharger la galerie après suppression
    } else {
      alert("Erreur lors de la suppression");
    }
  } catch (e) {
    console.error("Erreur suppression:", e);
  }
}
