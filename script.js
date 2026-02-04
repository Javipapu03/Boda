/* 🎵 Música */
const musica = document.getElementById("musica");
musica.volume = 0.3;

document.getElementById("playMusic").addEventListener("click", () => {
  musica.play();
});

/* ⏳ Contador con zona horaria Paraguay */
const fechaBodaParaguay = new Date(
  new Date("2026-06-12T17:00:00").toLocaleString("en-US", { timeZone: "America/Asuncion" })
).getTime();

const contador = document.getElementById("contador");
let prev = {};

contador.innerHTML = `
  <div><span id="dias" class="valor">0</span><span>días</span></div>
  <div><span id="horas" class="valor">0</span><span>h</span></div>
  <div><span id="minutos" class="valor">0</span><span>min</span></div>
  <div><span id="segundos" class="valor">0</span><span>seg</span></div>
`;

setInterval(() => {
  const ahora = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Asuncion" })
  ).getTime();

  const distancia = fechaBodaParaguay - ahora;

  if (distancia < 0) {
    contador.innerHTML = "💍 ¡Hoy es el gran día!";
    return;
  }

  const valores = {
    dias: Math.floor(distancia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((distancia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((distancia / (1000 * 60)) % 60),
    segundos: Math.floor((distancia / 1000) % 60)
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

/* ✅ Confirmación RSVP */
document.getElementById("confirmadoBtn").addEventListener("click", () => {
  document.getElementById("gracias").classList.add("mostrar");
});

/* 📸 Slider */
const slides = document.querySelector(".slides");
const imgs = slides.children;
let index = 0;
let intervalo;

function mostrarSlide(i) {
  slides.style.transform = `translateX(-${i * 100}%)`;
}

function iniciarAutoSlider() {
  intervalo = setInterval(() => {
    index = (index + 1) % imgs.length;
    mostrarSlide(index);
  }, 4000);
}

function reiniciarAutoSlider() {
  clearInterval(intervalo);
  iniciarAutoSlider();
}

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

iniciarAutoSlider();

/* 🌟 Animaciones de elementos .scroll y slider/botones */
window.addEventListener("load", () => {
  const elementos = document.querySelectorAll(".scroll");
  const slider = document.querySelector(".slider");
  const botones = document.querySelectorAll(".boton, #confirmadoBtn");

  // Animación secuencial de scroll
  elementos.forEach((el, idx) => {
    setTimeout(() => el.classList.add("mostrar"), idx * 200);
  });

  // Slider entra desde abajo
  setTimeout(() => {
    slider.style.transition = "all 0.6s ease-out";
    slider.style.opacity = 1;
    slider.style.transform = "translateY(0)";
  }, 1000);

  // Botones tipo lacre flotantes
  botones.forEach((btn, idx) => {
    btn.style.opacity = 0;
    btn.style.transform = "translateY(20px)";
    setTimeout(() => {
      btn.style.transition = "all 0.6s ease-out";
      btn.style.opacity = 1;
      btn.style.transform = "translateY(0)";
    }, 1200 + idx * 200);
  });

  // Activar efecto lacre dorado después de aparecer
  botones.forEach((btn, idx) => {
    setTimeout(() => btn.classList.add("mostrarLacre"), 1500 + idx * 200);
  });
});

/* 💳 Copiar datos de cuenta */
document.querySelectorAll(".copiar-cuenta").forEach(btn => {
  btn.addEventListener("click", () => {
    const texto = btn.dataset.texto;
    navigator.clipboard.writeText(texto).then(() => {
      btn.textContent = "Copiado";
      setTimeout(() => {
        btn.textContent = "Copiado";
      }, 2000);
    });
  });
});

/* 🔒 Mostrar / ocultar cuentas */
const verCuentasBtn = document.getElementById("verCuentasBtn");
const cuentasBox = document.getElementById("cuentasBox");

if (verCuentasBtn && cuentasBox) {
  verCuentasBtn.addEventListener("click", () => {
    cuentasBox.classList.toggle("mostrar");
    verCuentasBtn.textContent = cuentasBox.classList.contains("mostrar")
      ? "Ocultar"
      : "Agradecimiento";
  });
}

/* 🕊️ Mostrar Zoom solo el día del evento */
const zoomBox = document.getElementById("zoomBox");

if (zoomBox) {
  const inicioEvento = fechaBodaParaguay;
  const finEvento = inicioEvento + (6 * 60 * 60 * 1000); // 6 horas

  const verificarZoom = () => {
    const ahora = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Asuncion" })
    ).getTime();

    if (ahora >= inicioEvento && ahora <= finEvento) {
      zoomBox.classList.add("mostrar");
    }
  };

  verificarZoom();          // Ejecuta al cargar
  setInterval(verificarZoom, 60000); // Revisa cada 1 minuto
}

