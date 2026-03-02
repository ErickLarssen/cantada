const typewriterElement = document.getElementById('typewriter');
const cursorElement = document.querySelector('.cursor');

const text = 'Olá, PESSOA!';
let index = 0;
let typing = true;

function typeLoop() {
    if (typing) {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeLoop, 100);
        } else {
            typing = false;
            setTimeout(typeLoop, 1200);
        }
    } else {
        if (index > 0) {
            typewriterElement.textContent = text.substring(0, --index);
            setTimeout(typeLoop, 60);
        } else {
            typing = true;
            setTimeout(typeLoop, 300);
        }
    }
}

window.addEventListener('load', typeLoop);