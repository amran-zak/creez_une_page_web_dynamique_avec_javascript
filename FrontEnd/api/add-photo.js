const photoForm = document.getElementById('photoForm');
const submitBtn = document.getElementById('submitBtn');
const imageInput = document.getElementById('imageInput');
const titleInput = document.getElementById('titleInput');
const categorySelect = document.getElementById('categorySelect');

// Load catégories depuis API
fetch('http://localhost:5678/api/categories')
  .then(res => res.json())
  .then(categories => {
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  });

// Validation dynamique
[imageInput, titleInput, categorySelect].forEach(input => {
  input.addEventListener('input', () => {
    if (imageInput.files.length && titleInput.value && categorySelect.value) {
      submitBtn.disabled = false;
      submitBtn.classList.add('enabled');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('enabled');
    }
  });
});

// Soumission
photoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);

  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (response.ok) {
    loadModalGallery(); // Refresh gallery
    resetForm();
    modalGallery.style.display = 'flex';
    addPhotoForm.style.display = 'none';
  }
});

function resetForm() {
  photoForm.reset();
  submitBtn.disabled = true;
  submitBtn.classList.remove('enabled');
}
