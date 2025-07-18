function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleDarkMode);

  const list = document.getElementById('repo-list');
  if (list) {
    fetch('https://api.github.com/users/michligtenberg2/repos')
      .then(r => r.json())
      .then(data => {
        data.filter(repo => repo.has_pages && repo.name !== 'michligtenberg2.github.io')
          .forEach(repo => {
            const a = document.createElement('a');
            a.href = `https://michligtenberg2.github.io/${repo.name}`;
            a.textContent = repo.name;
            const div = document.createElement('div');
            div.className = 'repo';
            div.appendChild(a);
            list.appendChild(div);
          });
      });
  }
});
