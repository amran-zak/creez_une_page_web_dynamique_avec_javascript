const token = localStorage.getItem('token');
const adminBar = document.getElementById('admin-bar');
if (token) {
  adminBar.style.display = 'block';
}
