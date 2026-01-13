// 1. NAVIGATION LOGIC (Menú hamburguesa y sombra)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle Menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 2. SMOOTH SCROLLING (Desplazamiento suave)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. ANIMATIONS ON SCROLL (Aparición de elementos)
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .fleet-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 4. BACK TO TOP BUTTON (Botón subir)
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. NOTIFICATION SYSTEM (Notificaciones bonitas)
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification`;
    notification.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos inline para asegurar que se vea bien sin tocar el CSS
    notification.style.cssText = `
        position: fixed; top: 120px; right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white; padding: 1rem 1.5rem; border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000;
        transform: translateX(100%); transition: transform 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// 6. CONTACT FORM HANDLING (Formulario de contacto)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                showNotification('¡Mensaje enviado! Nos pondremos en contacto.', 'success');
                contactForm.reset();
            } else {
                showNotification('Hubo un error. Intente nuevamente.', 'error');
            }
        } catch (error) {
            showNotification('Error de conexión.', 'error');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// YA NO NECESITAS LA SECCIÓN 7 (CHATBOT) PORQUE AHORA USAS EL ENLACE DIRECTO