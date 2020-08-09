$(document).ready(function() {
    $('.editDiv').on('click', function() {
        $('#editAbout').toggle('slow');
        
        let textarea = document.getElementById('editAbout');
        textarea.innerHTML = document.getElementById('intro').textContent;

        $('#intro').toggle('slow');
        $('#details input').toggle('slow');
        $('#saveProfile').toggle('slow');
    })
})
