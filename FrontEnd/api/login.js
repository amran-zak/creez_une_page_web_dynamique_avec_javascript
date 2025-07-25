const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement

  const email = document.getElementById('emailLogin').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la connexion');
    }

    // Stockage du token
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);

    // Redirection vers la page d’accueil
    window.location.href = 'index.html';
  } catch (error) {
    errorMessage.textContent = 'Email ou mot de passe incorrect.';
    console.error('Erreur :', error);
  }
});
