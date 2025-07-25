// Sélectionne la galerie
const gallery = document.querySelector('.gallery');

// Fonction pour récupérer et afficher les travaux
async function fetchAndDisplayWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) throw new Error('Erreur lors du chargement des projets');
    const works = await response.json();

    // Vider la galerie (par sécurité)
    gallery.innerHTML = '';

    // Créer les éléments à partir des données récupérées
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

  } catch (error) {
    console.error(error);
    gallery.innerHTML = '<p>Une erreur est survenue lors du chargement des projets.</p>';
  }
}

// Appel au chargement de la page
fetchAndDisplayWorks();
