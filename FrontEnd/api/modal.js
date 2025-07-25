const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('modal-close');
const modal = document.getElementById('modal');
const overlay = document.getElementById('modal-overlay');

const galleryView = document.getElementById('modal-gallery-view');
const addView = document.getElementById('modal-add-view');
const switchToAddView = document.getElementById('switchToAddView');
const backToGallery = document.getElementById('backToGallery');

// Ouvrir la modale
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  galleryView.classList.add('active');
  addView.classList.remove('active');
});

// Fermer la modale
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

overlay.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Switch vers vue ajout
switchToAddView.addEventListener('click', () => {
  galleryView.classList.remove('active');
  addView.classList.add('active');
});

// Retour à la galerie
backToGallery.addEventListener('click', () => {
  addView.classList.remove('active');
  galleryView.classList.add('active');
});
