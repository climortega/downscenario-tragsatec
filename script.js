function showPage(pageName) {

let pages = document.getElementsByClassName("page");

for (let i = 0; i < pages.length; i++) {
pages[i].style.display = "none";
}

document.getElementById(pageName).style.display = "block";

}

function goHome() {
showPage("home");
}

window.onload = function() {
showPage("home");
};