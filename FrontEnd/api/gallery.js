const gallery = document.querySelector('.gallery');
const filtersContainer = document.querySelector('.filters');

let allWorks = [];

// Récupère les travaux
async function fetchWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  return await response.json();
}

// Récupère les catégories
async function fetchCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}

// Affiche les travaux passés en paramètre
function displayWorks(works) {
  gallery.innerHTML = '';

  works.forEach(work => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;

    const caption = document.createElement('figcaption');
    caption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

// Crée dynamiquement les boutons de filtre
function createFilterButtons(categories) {
  filtersContainer.innerHTML = '';

  // Bouton "Tous"
  const allBtn = document.createElement('button');
  allBtn.textContent = 'Tous';
  allBtn.classList.add('filter-btn', 'active');
  allBtn.addEventListener('click', () => {
    displayWorks(allWorks);
    setActiveFilter(allBtn);
  });
  filtersContainer.appendChild(allBtn);

  // Boutons par catégorie
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.name;
    btn.classList.add('filter-btn');
    btn.addEventListener('click', () => {
      const filtered = allWorks.filter(work => work.categoryId === category.id);
      displayWorks(filtered);
      setActiveFilter(btn);
    });
    filtersContainer.appendChild(btn);
  });
}

// Active visuellement le bouton sélectionné
function setActiveFilter(selectedBtn) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  selectedBtn.classList.add('active');
}

// Initialisation
async function initGallery() {
  try {
    allWorks = await fetchWorks();
    const categories = await fetchCategories();

    displayWorks(allWorks);
    createFilterButtons(categories);
  } catch (error) {
    console.error('Erreur de chargement :', error);
    gallery.innerHTML = '<p>Erreur de chargement des projets</p>';
  }
}

initGallery();
