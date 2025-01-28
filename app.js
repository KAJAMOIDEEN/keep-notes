$(document).ready(function() {
    loadNotes();

    $('#addNoteButton').click(function() {
        const noteText = $('#noteInput').val().trim();
        if (noteText) {
            const timestamp = new Date().toLocaleString();
            const notes = getNotes();
            notes.push({ text: noteText, time: timestamp });
            localStorage.setItem('notes', JSON.stringify(notes));
            $('#noteInput').val('');
            loadNotes();
        } else {
            alert("Please enter a note.");
        }
    });

    $('#clearAllButton').click(function() {
        localStorage.removeItem('notes');
        loadNotes();
    });

    function loadNotes() {
        const notes = getNotes();
        $('#notesContainer').empty();
        notes.forEach(note => {
            $('#notesContainer').append(`<div class="list-group-item">${note.text}<br><small>${note.time}</small></div>`);
        });
    }

    function getNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }
});