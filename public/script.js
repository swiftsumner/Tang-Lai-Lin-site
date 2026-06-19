const githubUsername = 'swiftsumner';
const repoList = document.getElementById('repo-list');

async function loadRepos() {
  if (!repoList) return;

  repoList.innerHTML = '<p class="repo-status">Loading repositories…</p>';

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      repoList.innerHTML = '<p class="repo-status">No public repositories available right now.</p>';
      return;
    }

    repoList.innerHTML = '';

    repos.forEach((repo) => {
      const card = document.createElement('article');
      card.className = 'repo-card';
      card.innerHTML = `
        <div class="repo-card-header">
          <h3>${repo.name}</h3>
          <a href="${repo.html_url}" target="_blank" rel="noreferrer">View</a>
        </div>
        <p>${repo.description || 'No description provided.'}</p>
        <div class="repo-meta">
          ${repo.language ? `<span>${repo.language}</span>` : ''}
          <span>★ ${repo.stargazers_count}</span>
        </div>
      `;
      repoList.appendChild(card);
    });
  } catch (error) {
    repoList.innerHTML = '<p class="repo-status">Unable to load repositories at the moment. Please try again later.</p>';
  }
}

loadRepos();
