// Carousel - Carrosel
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper span");

let isDragStart = false;
let isDragging = false;
let prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    const e = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft === e ? "none" : "block";
};

arrowIcons.forEach(e => {
    e.addEventListener("click", () => {
        const o = firstImg.clientWidth + 14;
        carousel.scrollLeft += e.id === "left" ? -o : o;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {
    if (carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth) return;
    positionDiff = Math.abs(positionDiff);

    const e = firstImg.clientWidth + 14;
    const o = e - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        carousel.scrollLeft += positionDiff > e / 3 ? o : -positionDiff;
    } else {
        carousel.scrollLeft -= positionDiff > e / 3 ? o : -positionDiff;
    }
};

const dragStart = e => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = e => {
    if (isDragStart) {
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (isDragging) {
        isDragging = false;
        autoSlide();
    }
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
// End - Fim

// Formatting the phone - Formatando o telefone.
const telefoneInput = document.getElementById("tel");

function formatarTelefone(e) {
    let o = e.value.replace(/\D/g, "");
    if (o.length <= 10) {
        e.value = o.replace(/(\d{2})(\d{0,4})(\d{0,4})/, "($1) $2-$3");
    } else {
        e.value = o.replace(/(\d{2})(\d{0,5})(\d{0,4})/, "($1) $2-$3");
    }
}

telefoneInput.addEventListener("input", e => {
    formatarTelefone(e.target);
});
// End - Fim

// Ativa o botão para um menu
const button = document.getElementById('button');

function handleClick() {
    button.classList.toggle('active');
}
// End - Fim

// Menu 
const iconeMenu = document.getElementById("button");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu a");

iconeMenu.addEventListener("click", () => {
    menu.classList.toggle("show");
});

function scrollToSection(e) {
    e.preventDefault();
    const o = e.target.getAttribute("href");
    const t = document.querySelector(o);
    if (t) {
        t.scrollIntoView({
            behavior: "smooth"
        });
    }
}
// End - Fim

// Smooth scrolling navigation menu items and button that returns to the top of the page.
// Itens do menu de navegação com rolagem suave e botão que retorna ao topo da página.
const sections = ["quem-sou", "habilidades", "portfolio", "contate-me"];
sections.forEach(e => {
    document.querySelector(`#${e}`).addEventListener("click", scrollToSection);
});

const voltarComecoBtn = document.getElementById("voltar-comeco");

function mostrarBtnVoltarComeco() {
    voltarComecoBtn.style.display = "block";
}

function ocultarBtnVoltarComeco() {
    voltarComecoBtn.style.display = "none";
}

window.addEventListener("scroll", () => {
    window.pageYOffset > 500 ? mostrarBtnVoltarComeco() : ocultarBtnVoltarComeco();
});

function scrollToTopSmoothly() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

voltarComecoBtn.addEventListener("click", () => {
    scrollToTopSmoothly();
});
// End - Fim

// Captures the name of the form and displays it in the message textarea.
// Captura o nome do formulário e mostra no textarea da mensagem.
const nameInput = document.getElementById("name");
const messageTextarea = document.getElementById("message");

nameInput.addEventListener("input", () => {
    updateMessage();
});

messageTextarea.addEventListener("input", () => {
    // Impedir que a mensagem seja atualizada automaticamente se o usuário estiver editando o texto manualmente.
    if (!nameInput.value) {
        updateMessage();
    }
});

function updateMessage() {
    const name = nameInput.value;
    const message = name ? `Olá, sou ${name}, e estou entrando em contato para podermos conversar mais detalhadamente.` : "";
    messageTextarea.value = message;
}
// End - Fim