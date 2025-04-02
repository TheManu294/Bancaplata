document.addEventListener('DOMContentLoaded', function() {
    const montoGlobal = document.getElementById('monto-global');
    const sliderGlobal = document.getElementById('monto-global-slider');
    const resultados = [
      document.getElementById('total-1'),
      document.getElementById('total-2'),
      document.getElementById('total-3')
    ];
    const tasas = [0.20, 0.25, 0.30]; // Tasas para cada calculadora
  
    // Formatear a COP
    const formatCOP = (monto) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(monto);
    };
  
    // Actualizar todas las calculadoras
    const actualizarCalculadoras = () => {
      const monto = parseFloat(montoGlobal.value);
      
      resultados.forEach((resultado, index) => {
        const total = monto + (monto * tasas[index]);
        resultado.textContent = formatCOP(total);
      });
    };
  
    // Eventos
    sliderGlobal.addEventListener('input', () => {
      montoGlobal.value = sliderGlobal.value;
      actualizarCalculadoras();
    });
  
    montoGlobal.addEventListener('input', () => {
      sliderGlobal.value = montoGlobal.value;
      actualizarCalculadoras();
    });
  
    // Botones
    document.querySelectorAll('.btn-pedir').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const monto = parseFloat(montoGlobal.value);
        const total = monto + (monto * tasas[index]);
        
        alert(`📌 Préstamo aprobado!\n\n` +
              `• Plazo: ${index === 0 ? '1-8' : index === 1 ? '9-15' : '16-30'} días\n` +
              `• Tasa: ${tasas[index] * 100}%\n` +
              `• Total a pagar: ${formatCOP(total)}`);
      });
    });
  
    // Inicializar
    actualizarCalculadoras();
  });
  
  //preguntas frecuentes

  // Datos de preguntas y respuestas
const preguntas = [
  "¿Cuál es el monto mínimo de préstamo?",
  "¿Cómo se calculan los intereses?",
  "¿Qué pasa si no pago a tiempo?",
  "¿Necesito garantía para el préstamo?",
  "¿Cómo recibo el dinero aprobado?"
];

const respuestas = [
  "El monto mínimo es de $100,000 COP para todos los plazos disponibles.",
  "Los intereses varían según el plazo: 20% (1-8 días), 25% (9-15 días), 30% (16-30 días).",
  "En caso de mora, se aplicará un recargo diario del 2% sobre el saldo pendiente.",
  "No requerimos garantías. Nuestros préstamos son 100% personales.",
  "El dinero se transfiere directamente a tu cuenta bancaria en menos de 1 hora hábil."
];

// Variables globales
let currentIndex = 0;
let intervalId;
let autoRotacionActiva = true; // Bandera para controlar el estado

// Elementos del DOM
const faqSlider = document.querySelector('.faq-slider');
const faqPrev = document.getElementById('faq-prev');
const faqNext = document.getElementById('faq-next');
const faqCounter = document.getElementById('faq-counter');

// Crear elementos HTML de preguntas
function crearItemsFAQ() {
  faqSlider.innerHTML = '';
  
  preguntas.forEach((pregunta, index) => {
    const item = document.createElement('div');
    item.className = `faq-item ${index === 0 ? 'active' : ''}`;
    item.innerHTML = `
      <h3>${pregunta}</h3>
      <p>${respuestas[index]}</p>
    `;
    faqSlider.appendChild(item);
  });
}

// Cambiar pregunta con animación
function cambiarPregunta(nuevoIndex) {
  const items = document.querySelectorAll('.faq-item');
  
  if (nuevoIndex < 0 || nuevoIndex >= preguntas.length) return;
  
  items[currentIndex].classList.remove('active');
  items[currentIndex].classList.add('leaving');
  
  setTimeout(() => {
    items[currentIndex].classList.remove('leaving');
    items[nuevoIndex].classList.add('active');
    currentIndex = nuevoIndex;
    actualizarControles();
  }, 500);
}

// Actualizar estado de controles
function actualizarControles() {
  faqCounter.textContent = `${currentIndex + 1}/${preguntas.length}`;
  faqPrev.disabled = currentIndex === 0;
  faqNext.disabled = currentIndex === preguntas.length - 1;
}

// Auto-rotación inicial
function iniciarAutoRotacion() {
  if (!autoRotacionActiva) return;
  
  intervalId = setInterval(() => {
    const siguienteIndex = (currentIndex + 1) % preguntas.length;
    cambiarPregunta(siguienteIndex);
  }, 5000);
}

// Detener auto-rotación permanentemente
function detenerAutoRotacion() {
  autoRotacionActiva = false;
  clearInterval(intervalId);
}

// Event Listeners
faqPrev.addEventListener('click', () => {
  detenerAutoRotacion();
  if (currentIndex > 0) {
    cambiarPregunta(currentIndex - 1);
  }
});

faqNext.addEventListener('click', () => {
  detenerAutoRotacion();
  if (currentIndex < preguntas.length - 1) {
    cambiarPregunta(currentIndex + 1);
  }
});

//ajustes para mobil
document.querySelectorAll('.faq-item p').forEach(p => {
  if (p.textContent.length > 150) {
    console.warn('Respuesta muy larga:', p.textContent.substring(0, 50) + '...');
  }
});

function ajustarAlturaMobile() {
  if (window.innerWidth < 768) {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.style.minHeight = `${item.scrollHeight + 30}px`;
    });
  }
}
// Ejecutar al cargar y al cambiar tamaño:
window.addEventListener('resize', ajustarAlturaMobile);
ajustarAlturaMobile();

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  crearItemsFAQ();
  actualizarControles();
  iniciarAutoRotacion();
});