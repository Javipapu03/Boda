const musica = document.getElementById("musica");
musica.volume = 0.3;

document.getElementById("playMusic").onclick = () => {
  musica.play();
};

const fechaBoda = new Date("June 12, 2026 17:00:00").getTime();
const contador = document.getElementById("contador");

let prev = {};

contador.innerHTML = `
  <div><span id="dias" class="valor">0</span><span>días</span></div>
  <div><span id="horas" class="valor">0</span><span>h</span></div>
  <div><span id="minutos" class="valor">0</span><span>min</span></div>
  <div><span id="segundos" class="valor">0</span><span>seg</span></div>
`;

setInterval(() => {
  const ahora = new Date().getTime();
  const distancia = fechaBoda - ahora;

  if (distancia < 0) {
    contador.innerHTML = "💍 ¡Hoy es el gran día!";
    return;
  }

  const valores = {
    dias: Math.floor(distancia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutos: Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)),
    segundos: Math.floor((distancia % (1000 * 60)) / 1000)
  };

  Object.keys(valores).forEach(key => {
    const el = document.getElementById(key);
    if (prev[key] !== valores[key]) {
      el.textContent = valores[key];
      el.classList.remove("animar");
      void el.offsetWidth; // fuerza reflow
      el.classList.add("animar");
      prev[key] = valores[key];
    }
  });
}, 1000);

document.getElementById("confirmadoBtn").onclick = () => {
  document.getElementById("gracias").classList.add("mostrar");
};

const slides = document.querySelector(".slides");
const imgs = slides.children;
let i = 0;

document.querySelector(".next").onclick = () => {
  i = (i + 1) % imgs.length;
  slides.style.transform = `translateX(-${i * 100}%)`;
};

document.querySelector(".prev").onclick = () => {
  i = (i - 1 + imgs.length) % imgs.length;
  slides.style.transform = `translateX(-${i * 100}%)`;
};

/* 📸 Slider automático */
const Slider = document.querySelector(".slides");
const img = slides.children;
let index = 0;
let intervalo;

/* Función para mostrar slide */
function mostrarSlide(i) {
  slides.style.transform = `translateX(-${i * 100}%)`;
}

/* Avanza automáticamente */
function iniciarAutoSlider() {
  intervalo = setInterval(() => {
    index = (index + 1) % imgs.length;
    mostrarSlide(index);
  }, 4000); // ⏱️ 4 segundos
}

/* Botones manuales */
document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % imgs.length;
  mostrarSlide(index);
  reiniciarAutoSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + imgs.length) % imgs.length;
  mostrarSlide(index);
  reiniciarAutoSlider();
});

/* Reinicia el automático cuando el usuario toca */
function reiniciarAutoSlider() {
  clearInterval(intervalo);
  iniciarAutoSlider();
}

/* Arranque */
iniciarAutoSlider();
