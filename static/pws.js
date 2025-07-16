AOS.init();

window.onload = () => {
    console.log("test");
}

const testElement = document.getElementById('projects');
testElement.addEventListener('scroll', () => {
    console.log("ok");
})
