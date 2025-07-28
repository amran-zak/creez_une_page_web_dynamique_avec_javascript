const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const addPhotoForm = document.getElementById('addPhotoForm');
const backToGallery = document.getElementById('backToGallery');
const modalGallery = document.getElementById('modalGallery');

// Afficher la modale
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  loadModalGallery();
});

// Fermer la modale
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  resetForm();
});

// Clic en dehors = fermer
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    resetForm();
  }
});

// Afficher le formulaire
addPhotoBtn.addEventListener('click', () => {
  modalGallery.style.display = 'none';
  addPhotoForm.style.display = 'block';
});

// Revenir à la galerie
backToGallery.addEventListener('click', () => {
  addPhotoForm.style.display = 'none';
  modalGallery.style.display = 'flex';
});

// Afficher la galerie dans la modale
function loadModalGallery() {
  modalGallery.innerHTML = ''; // reset
  // Récupère tes projets ici depuis l'API ou tes données locales
  fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then(data => {
      data.forEach(work => {
        const item = document.createElement('div');
        item.classList.add('image-item');
        item.innerHTML = `
          <img src="${work.imageUrl}" alt="${work.title}">
          <button class="delete-btn" data-id="${work.id}">×</button>
        `;
        modalGallery.appendChild(item);
      });
    });
}

// Gestion des suppressions
modalGallery.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadModalGallery(); // Refresh
  }
});
