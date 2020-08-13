var firebaseConfig = {
    apiKey: "AIzaSyBnC5pX951g73LsFa2gIDfKsJmPMerAO-Q",
    authDomain: "resume-b6cfe.firebaseapp.com",
    databaseURL: "https://resume-b6cfe.firebaseio.com",
    projectId: "resume-b6cfe",
    storageBucket: "resume-b6cfe.appspot.com",
    messagingSenderId: "570089405876",
    appId: "1:570089405876:web:49ece736e9567a73b186e1"
};

// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);
var info;
var db = firebase.firestore();

function readProfile(doc) {
    let mainDiv = document.getElementById("details");
    mainDiv.setAttribute('data-id', doc.id);

    let fullName = document.createElement('h1');
    fullName.textContent = "Rupert Myles B. Yap"

    let textArea = document.createElement('textArea');
    textArea.id = "editAbout";

    let intro = document.createElement("p");
    intro.textContent = doc.data().value;
    intro.id = "intro";

    let githubAnchor = document.createElement("a");
    githubAnchor.href = doc.data().github;

    let github = document.createElement("img");
    github.classList.add("contact");
    github.src = "assets/img/github.svg";
    github.height = 40;
    github.width = 40;

    let fbAnchor = document.createElement("a");
    fbAnchor.href = doc.data().facebook;

    let fb = document.createElement("img");
    fb.classList.add("contact");
    fb.src = "assets/img/facebook.svg";
    fb.height = 40;
    fb.width = 40;

    let tgAnchor = document.createElement("a");
    tgAnchor.href = doc.data().telegram;

    let tg = document.createElement("img");
    tg.classList.add("contact");
    tg.src = "assets/img/telegram.svg";
    tg.height = 40;
    tg.width = 40;

    let githubInput = document.createElement("input");
    githubInput.id = "githubInput";
    githubInput.value = doc.data().github;

    let fbInput = document.createElement("input");
    fbInput.id = "fbInput";
    fbInput.value = doc.data().facebook;

    let tgInput = document.createElement("input");
    tgInput.id = "tgInput";
    tgInput.value = doc.data().telegram;

    let saveContact = document.createElement("button");
    saveContact.id = "saveProfile";
    saveContact.classList.add("btn");
    saveContact.classList.add("btn-primary");
    saveContact.innerHTML = "Save";

    mainDiv.appendChild(fullName);
    mainDiv.appendChild(textArea);
    mainDiv.appendChild(intro);

    mainDiv.appendChild(githubAnchor);
    githubAnchor.appendChild(github);

    mainDiv.appendChild(fbAnchor);
    fbAnchor.appendChild(fb);

    mainDiv.appendChild(tgAnchor);
    tgAnchor.appendChild(tg);

    mainDiv.appendChild(githubInput);
    mainDiv.appendChild(fbInput);
    mainDiv.appendChild(tgInput);
    mainDiv.appendChild(saveContact);


    saveContact.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.currentTarget.parentNode.getAttribute('data-id');
        db.collection('others').doc(id).update({
            value: document.getElementById('editAbout').value,
            github: document.getElementById('githubInput').value,
            facebook: document.getElementById('fbInput').value,
            telegram: document.getElementById('tgInput').value
        });
    });
}

db.collection("others").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added')
            readProfile(change.doc);
        else if (change.type === 'modified') {
            $('#details').empty();
            readProfile(change.doc);
        }
    })
})
const projList = document.querySelector("#portfolioCards")

function readProject(doc) {
    let mainDiv = document.getElementById("portfolioCards");

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("project");
    card.setAttribute('data-id', doc.id);

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    let name = document.createElement("h5");
    name.classList.add("mb-0");
    name.textContent = doc.data().name;

    let course = document.createElement("span");
    course.classList.add("course");
    course.textContent = doc.data().course;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let info = document.createElement("span");
    info.textContent = doc.data().info;

    let link = document.createElement("button");
    link.classList.add("btn");
    link.classList.add("btn-primary");
    link.classList.add("btn-portfolio");
    link.textContent = "Download here!";

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("deleteButton");

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/img/delete-project.svg";
    deleteIcon.height = 30;
    deleteIcon.width = 30;


    deleteDiv.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.currentTarget.parentNode.getAttribute('data-id');
        db.collection('projects').doc(id).delete();
    });

    link.onclick = function () {
        window.open(doc.data().link);
    }

    mainDiv.appendChild(card);

    card.appendChild(cardHeader);
    cardHeader.appendChild(name);
    cardHeader.appendChild(course);

    card.appendChild(cardBody);
    cardBody.appendChild(info);
    cardBody.appendChild(link);

    card.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteIcon);
}

db.collection("projects").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added')
            readProject(change.doc);

        else if (change.type === 'removed') {
            console.log(change.doc.id);
            let proj = projList.querySelector("[data-id=" + "\'" + change.doc.id + "\'" + "]");
            projList.removeChild(proj);
        }
    })
})

const educList = document.querySelector("#educCards")

function readEduc(doc, i) {
    let mainDiv = document.getElementById("educCards");

    let row = document.createElement("div");
    row.classList.add("educRow");
    row.setAttribute('data-id', doc.id);

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("educ");
    card.setAttribute('data-id', doc.id);

    let num = document.createElement("h1");
    num.textContent = i;

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    let name = document.createElement("h5");
    name.classList.add("mb-0");
    name.textContent = doc.data().school;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let degree = document.createElement("span");
    degree.classList.add("degree")
    degree.textContent = doc.data().degree;

    let years = document.createElement("span");
    years.textContent = doc.data().year_start + " - " + doc.data().year_end;

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("deleteButton");

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/img/delete-school.svg";
    deleteIcon.height = 30;
    deleteIcon.width = 30;

    deleteDiv.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.currentTarget.parentNode.getAttribute('data-id');
        db.collection('education').doc(id).delete();
    });

    mainDiv.appendChild(row);

    if (i % 2) {
        num.classList.add("left");
        row.appendChild(num);
        row.appendChild(card);
    } else {
        num.classList.add("right");
        row.appendChild(deleteDiv);
        deleteDiv.appendChild(deleteIcon);
        row.appendChild(card);
        row.appendChild(num);
    }


    card.appendChild(cardHeader);
    cardHeader.appendChild(name);
    cardHeader.appendChild(degree);

    card.appendChild(cardBody);
    cardBody.appendChild(years);

    card.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteIcon);
}

let i = 1;
db.collection("education").orderBy("year_start").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
        if (change.type === 'added') {
            readEduc(change.doc, i);
            i++;
        } else if (change.type === 'removed') {
            console.log(change.doc.id);
            let school = educList.querySelector("[data-id=" + "\'" + change.doc.id + "\'" + "]");
            educList.removeChild(school);
            i--;
        }
    })
})

const orgList = document.querySelector("#orgsDiv");

function readOrg(doc) {
    let mainDiv = document.getElementById("orgsDiv");

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("orgs");
    card.setAttribute('data-id', doc.id);

    let cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    let name = document.createElement("h5");
    name.classList.add("mb-0");
    name.textContent = doc.data().name;

    let orgPos = document.createElement("span");
    orgPos.classList.add("position");
    orgPos.textContent = doc.data().position;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let years = document.createElement("span");
    years.textContent = doc.data().year_start + " - " + doc.data().year_end;

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("deleteButton");

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/img/delete-org.svg";
    deleteIcon.height = 30;
    deleteIcon.width = 30;

    deleteDiv.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.currentTarget.parentNode.getAttribute('data-id');
        db.collection('organizations').doc(id).delete();
    });

    mainDiv.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteIcon);
    mainDiv.appendChild(card);

    card.appendChild(cardHeader);
    cardHeader.appendChild(name);
    cardHeader.appendChild(orgPos);

    card.appendChild(cardBody);

    cardBody.appendChild(years);

    card.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteIcon);
}

db.collection("organizations").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added')
            readOrg(change.doc);

        else if (change.type === 'removed') {
            console.log(change.doc.id);
            let org = orgList.querySelector("[data-id=" + "\'" + change.doc.id + "\'" + "]");
            orgList.removeChild(org);
        }
    })
})