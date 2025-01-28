$(document).ready(function() {
    const notes = [];

    loadNotes(); // Load notes on initial page load

    $('#addNoteButton').click(function() {
        const noteText = $('#noteInput').val().trim();
        if (noteText) {
            const timestamp = new Date().toLocaleString();
            notes.push({ text: noteText, time: timestamp });
            $('#noteInput').val('');
            loadNotes();
        } else {
            alert("Please enter a note.");
        }
    });

    $('#clearAllButton').click(function() {
        notes.length = 0; // Clear notes array
        loadNotes();
    });

    $('#downloadButton').click(function() {
        const textContent = notes.map(note => `${note.text} (${note.time})`).join('\n');
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        document.body.appendChild(a); // Append link to body
        a.click(); // Simulate click to download
        document.body.removeChild(a); // Remove the link
        URL.revokeObjectURL(url); // Free memory
    });

    function loadNotes() {
        $('#notesContainer').empty();
        notes.forEach(note => {
            $('#notesContainer').append(`<div class="list-group-item">${note.text}<br><small>${note.time}</small></div>`);
        });
    }
});