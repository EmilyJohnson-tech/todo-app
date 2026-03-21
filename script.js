const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

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
