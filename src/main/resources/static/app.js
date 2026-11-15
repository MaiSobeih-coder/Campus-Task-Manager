const API = '/api/notes';
let allNotes = [];
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    document.getElementById('noteForm').addEventListener('submit', handleAddNote);
});

async function loadNotes() {
    try {
        const res = await fetch(API);
        allNotes = await res.json();
        updateDashboard();
        renderNotes();
    } catch (error) {
        showToast('Failed to load tasks!', 'bg-danger');
    }
}

function updateDashboard() {
    const total = allNotes.length;
    const completed = allNotes.filter(n => n.completed).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-pending').innerText = pending;
    document.getElementById('stat-completed').innerText = completed;

    document.getElementById('progress-text').innerText = `${progress}%`;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function renderNotes() {
    const list = document.getElementById('notesList');
    list.innerHTML = '';

    let filteredNotes = allNotes;
    if (currentFilter === 'pending') filteredNotes = allNotes.filter(n => !n.completed);
    if (currentFilter === 'completed') filteredNotes = allNotes.filter(n => n.completed);

    if (filteredNotes.length === 0) {
        list.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-inbox text-secondary" style="font-size: 3rem;"></i>
                <h5 class="text-secondary mt-3">No tasks found for this filter.</h5>
            </div>
        `;
        return;
    }

    filteredNotes.forEach((n, index) => {
        const isCompleted = n.completed ? 'completed-task' : '';
        const checkIcon = n.completed ? 'bi-check-circle-fill text-success' : 'bi-circle text-secondary';

        // Add animation delay based on index
        const animationDelay = index * 0.05;

        list.innerHTML += `
            <div class="col-12" style="animation: fadeIn 0.4s ease forwards; animation-delay: ${animationDelay}s; opacity: 0;">
                <div class="glass-card task-card ${isCompleted} priority-${n.priority} d-flex justify-content-between align-items-center p-3">
                    <div class="d-flex align-items-center gap-3 task-content w-75">
                        <i class="bi ${checkIcon} fs-4" style="cursor:pointer;" onclick="toggleTask(${n.id})"></i>
                        <div class="text-truncate">
                            <h6 class="mb-0 fw-semibold text-light">${n.title}</h6>
                            <small class="text-secondary text-truncate d-block">${n.content}</small>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-dark border border-secondary text-light">${n.priority}</span>
                        <button class="btn btn-outline-danger btn-sm border-0" onclick="deleteNote(${n.id})">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

async function handleAddNote(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const priority = document.getElementById('priority').value;

    try {
        await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, priority })
        });

        document.getElementById('noteForm').reset();
        showToast('Task added successfully!', 'bg-success');
        loadNotes();
    } catch (error) {
        showToast('Error adding task!', 'bg-danger');
    }
}

async function toggleTask(id) {
    await fetch(`${API}/${id}/toggle`, { method: 'PUT' });
    loadNotes();
}

async function deleteNote(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    showToast('Task deleted!', 'bg-info');
    loadNotes();
}

function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.glass-filter').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderNotes();
}

function showToast(message, bgClass) {
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toast-message');

    toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
    toastBody.innerText = message;

    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}