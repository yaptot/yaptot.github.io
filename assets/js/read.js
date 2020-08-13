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

    let intro = document.createElement("p");
    intro.textContent = doc.data().value;

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

    mainDiv.appendChild(intro);

    mainDiv.appendChild(githubAnchor);
    githubAnchor.appendChild(github);

    mainDiv.appendChild(fbAnchor);
    fbAnchor.appendChild(fb);

    mainDiv.appendChild(tgAnchor);
    tgAnchor.appendChild(tg);
}

db.collection("others").get().then(function (snapshot) {
    snapshot.forEach(function (doc) {
        readProfile(doc);
    });
});

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

}

db.collection("projects").get().then(function (snapshot) {
    snapshot.forEach(function (doc) {
        readProject(doc);
    });
});

function readEduc(doc, i) {
    let mainDiv = document.getElementById("educCards");

    let row = document.createElement("div");
    row.classList.add("educRow");

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

    mainDiv.appendChild(row);

    if (i % 2) {
        num.classList.add("left");
        row.appendChild(num);
        row.appendChild(card);
    } else {
        num.classList.add("right");
        row.appendChild(card);
        row.appendChild(num);
    }


    card.appendChild(cardHeader);
    cardHeader.appendChild(name);
    cardHeader.appendChild(degree);

    card.appendChild(cardBody);
    cardBody.appendChild(years);
}

db.collection("education").orderBy("year_start").get().then(function (snapshot) {
    let i = 1;
    snapshot.forEach(function (doc) {
        readEduc(doc, i);
        i++;
    });
});

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

    mainDiv.appendChild(card);

    card.appendChild(cardHeader);
    cardHeader.appendChild(name);
    cardHeader.appendChild(orgPos);

    card.appendChild(cardBody);

    cardBody.appendChild(years);
}

db.collection("organizations").orderBy("year_start").get().then(function (snapshot) {
    snapshot.forEach(function (doc) {
        readOrg(doc);
    });
});