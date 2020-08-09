$("#plus-project").on('click', function() {
    $("#add-project-card").toggle("slow");
});

$("#plus-school").on('click', function() {
    $("#add-school-card").toggle("slow");
});

$("#plus-org").on('click', function() {
    $("#add-org-card").toggle("slow");
});

const projForm = document.querySelector("#add-project");

projForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('projects').add({
        name: projForm.projectName.value,
        course: projForm.course.value,
        info: projForm.info.value,
        link: projForm.url.value
    })

    projForm.reset();
})

const schoolForm = document.querySelector("#add-school");

schoolForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('education').add({
        school: schoolForm.schoolName.value,
        degree: schoolForm.degree.value,
        year_start: schoolForm.schoolStart.value,
        year_end: schoolForm.schoolEnd.value
    })

    schoolForm.reset();
})

const orgForm = document.querySelector("#add-org");

orgForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('organizations').add({
        name: orgForm.orgName.value,
        position: orgForm.position.value,
        year_start: orgForm.orgStart.value,
        year_end: orgForm.orgEnd.value
    })

    orgForm.reset();
})

