const addNoteButton = document.getElementById('addNoteButton');
const clearSelectedButton = document.getElementById('clearSelectedButton');
const clearAllButton = document.getElementById('clearAllButton');
const notesContainer = document.getElementById('notesContainer');
const noteInput = document.getElementById('noteInput');

// Load existing notes from localStorage
document.addEventListener('DOMContentLoaded', loadNotes);

// Handle Add Note button click
addNoteButton.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        const timestamp = new Date().toLocaleString(); // Get current timestamp
        saveNote({ text: noteText, time: timestamp });
        noteInput.value = ''; // Clear the input field
        displayNotes();
    } else {
        alert("Please enter a note.");
    }
});

// Clear selected notes
clearSelectedButton.addEventListener('click', function() {
    clearSelectedNotes();
});

// Clear all notes
clearAllButton.addEventListener('click', function() {
    clearAllNotes();
});

// Function to save a note
function saveNote(note) {
    let notes = getNotes();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    displayNotes();
}

// Function to display notes
function displayNotes() {
    const notes = getNotes();
    notesContainer.innerHTML = ''; // Clear previous notes
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index; // Store the index for deletion
        checkbox.className = 'mr-2';

        const noteText = document.createElement('span');
        noteText.innerHTML = `<strong>${note.text}</strong><br><small class="text-muted">${note.time}</small>`; // Display note and timestamp

        noteItem.appendChild(checkbox);
        noteItem.appendChild(noteText);
        notesContainer.appendChild(noteItem);
    });
}

// Function to clear selected notes
function clearSelectedNotes() {
    const checkboxes = notesContainer.querySelectorAll('input[type="checkbox"]:checked');
    const notes = getNotes();
    
    checkboxes.forEach(checkbox => {
        const index = checkbox.value;
        notes.splice(index, 1);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Function to clear all notes
function clearAllNotes() {
    localStorage.removeItem('notes'); // Remove notes from localStorage
    notesContainer.innerHTML = ''; // Clear displayed notes
}

// Function to get notes from
function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}