const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const themeToggle = document.getElementById('theme-toggle');
const THEME_STORAGE_KEY = 'theme-preference';

function initTheme() {
    let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function updateThemeToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    updateThemeToggleIcon(newTheme);
}

function refreshEmptyState() {
    emptyState.style.display = list.children.length === 0 ? 'block' : 'none';
}

function createTodoItem(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.type = 'button';
    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
        refreshEmptyState();
    });

    li.append(span, deleteButton);
    return li;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    const todoItem = createTodoItem(value);
    list.appendChild(todoItem);
    input.value = '';
    input.focus();
    refreshEmptyState();
});

refreshEmptyState();

initTheme();
themeToggle.addEventListener('click', toggleTheme);
