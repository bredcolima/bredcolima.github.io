// ===== BRED COLIMA IAP - JAVASCRIPT PREMIUM =====
// ===== TODAS LAS FUNCIONALIDADES =====

(function() {
    "use strict";

    // ----- INICIALIZACIÓN DE AOS -----
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 30,
            disable: 'mobile'
        });
    }

    // ----- PRELOADER -----
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 2000);
        }
    });

    // ----- CONTADORES ANIMADOS -----
    function initCounters() {
        const counters = document.querySelectorAll('.counter[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            if (isNaN(target)) return;
            
            const updateCounter = () => {
                const currentText = counter.innerText.replace(/,/g, '');
                const current = parseInt(currentText) || 0;
                const increment = Math.ceil(target / 80);
                
                if (current < target) {
                    const newValue = Math.min(current + increment, target);
                    counter.innerText = newValue.toLocaleString();
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            
            // Intersection Observer para iniciar cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(counter);
        });
    }
    setTimeout(initCounters, 600);

    // ----- MENÚ MÓVIL -----
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMobile.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navMobile.contains(e.target) && !menuToggle.contains(e.target)) {
                navMobile.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ----- HEADER SCROLL EFFECT -----
    const header = document.getElementById('mainHeader');
    const backTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        if (backTop) {
            if (window.scrollY > 400) {
                backTop.classList.add('visible');
            } else {
                backTop.classList.remove('visible');
            }
        }
    });

    // ----- BACK TO TOP -----
    if (backTop) {
        backTop.addEventListener('click', function() {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }

    // ----- SMOOTH SCROLL PARA ANCLAS -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Cerrar menú móvil
                if (navMobile) {
                    navMobile.classList.remove('active');
                }
                
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // ----- PAYMENT OPTIONS -----
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            if (e.target.closest('.copy-btn')) return;
            
            // Cerrar otros options abiertos
            paymentOptions.forEach(other => {
                if (other !== this && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
        });
    });

    // ----- COPY BUTTON (CLABE) -----
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const text = this.dataset.clipboard;
            if (!text) return;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar:', err);
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            });
        });
    });

    // ----- ACTIVE NAV LINK BASADO EN SCROLL -----
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
        const scrollY = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);

    // ----- GRÁFICAS CHART.JS CON COLORES PASTEL -----
    function initCharts() {
        if (typeof Chart === 'undefined') return;
        
        // Gráfica 1: Distribución de artículos - COLORES PASTEL
        const distributionCtx = document.getElementById('distributionChart');
        if (distributionCtx) {
            new Chart(distributionCtx, {
                type: 'pie',
                data: {
                    labels: ['Ropa', 'Material Const.', 'Varios', 'Accesorios', 'Muebles', 'Zapatos', 'Enseres'],
                    datasets: [{
                        data: [11448, 7052, 3540, 1409, 528, 528, 883],
                        backgroundColor: [
                            '#A8E6CF', // Verde pastel
                            '#FFD3B6', // Durazno pastel
                            '#FFB5B5', // Rosa pastel
                            '#D4A5A5', // Rosa viejo pastel
                            '#B5EAD7', // Menta pastel
                            '#C7CEE6', // Lavanda pastel
                            '#FDFD96'  // Amarillo pastel
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: { size: 11 } }
                        }
                    }
                }
            });
        }
        
        // Gráfica 2: Nuevo vs Usado - COLORES PASTEL
        const conditionCtx = document.getElementById('conditionChart');
        if (conditionCtx) {
            new Chart(conditionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Nuevo', 'Usado'],
                    datasets: [{
                        data: [12, 88],
                        backgroundColor: ['#C1E1C1', '#B5C9C3'], // Verde menta y gris azulado pastel
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: { size: 11 } }
                        }
                    }
                }
            });
        }
        
        // Gráfica 3: Población atendida - COLORES PASTEL
        const populationCtx = document.getElementById('populationChart');
        if (populationCtx) {
            new Chart(populationCtx, {
                type: 'bar',
                data: {
                    labels: ['Niños', 'Jóvenes', 'Adultos', 'Ancianos'],
                    datasets: [
                        {
                            label: 'Hombres',
                            data: [120, 349, 914, 337],
                            backgroundColor: '#A7C7E7', // Azul pastel
                            borderRadius: 8
                        },
                        {
                            label: 'Mujeres',
                            data: [73, 307, 1606, 358],
                            backgroundColor: '#FAC8CD', // Rosa pastel
                            borderRadius: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: { size: 11 } }
                        }
                    }
                }
            });
        }
        
        // Gráfica 4: Urbano/Rural - COLORES PASTEL
        const urbanCtx = document.getElementById('urbanRuralChart');
        if (urbanCtx) {
            new Chart(urbanCtx, {
                type: 'pie',
                data: {
                    labels: ['Urbano', 'Rural'],
                    datasets: [{
                        data: [983, 3081],
                        backgroundColor: ['#E6E6FA', '#D3D3D3'], // Lavanda pastel y gris perla
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: { size: 11 } }
                        }
                    }
                }
            });
        }
    }
    
    setTimeout(initCharts, 500);

    // ----- LIGHTBOX PARA GALERÍA -----
    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('galleryLightbox');
        
        if (!lightbox || galleryItems.length === 0) return;
        
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => {
            const img = item.querySelector('img');
            return img ? img.src : '';
        }).filter(src => src !== '');
        
        if (images.length === 0) return;
        
        // Abrir lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                if (lightboxImg) lightboxImg.src = images[currentIndex];
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            if (lightboxImg) lightboxImg.src = images[currentIndex];
        }
        
        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            if (lightboxImg) lightboxImg.src = images[currentIndex];
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        if (prevBtn) prevBtn.addEventListener('click', prevImage);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navegación por teclado
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        });
    }
    initLightbox();

    // ----- MAPA INTERACTIVO -----
    function initMap() {
        const mapElement = document.getElementById('map');
        
        if (mapElement && typeof L !== 'undefined') {
            const bredLat = 19.2350221;
            const bredLng = -103.7340239;
            
            const map = L.map('map').setView([bredLat, bredLng], 16);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(map);
            
            const marker = L.marker([bredLat, bredLng]).addTo(map);
            marker.bindPopup(`
                <div style="text-align:center;padding:10px;">
                    <h3 style="margin:0 0 8px;color:#0f5c3f;">BRED COLIMA IAP</h3>
                    <p style="margin:4px 0;"><strong>Medellín #585, Col. Popular</strong></p>
                    <p style="margin:4px 0;">Colima, México, 28070</p>
                    <p style="margin:4px 0;">📞 312 554 4355</p>
                </div>
            `).openPopup();
        }
    }
    
    if (document.readyState === 'complete') {
        initMap();
    } else {
        window.addEventListener('load', initMap);
    }

    // ----- CARRUSELES DE ALIANZAS -----
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel-track');
        
        carousels.forEach(track => {
            const category = track.dataset.category;
            const container = track.closest('.carousel-container');
            const prevBtn = document.querySelector(`.carousel-btn.prev[data-category="${category}"]`);
            const nextBtn = document.querySelector(`.carousel-btn.next[data-category="${category}"]`);
            const indicatorsContainer = document.querySelector(`.carousel-indicators[data-category="${category}"]`);
            
            if (!container || !prevBtn || !nextBtn) return;
            
            const logos = track.querySelectorAll('.alliance-logo');
            if (logos.length === 0) return;
            
            const logoWidth = 180 + 25;
            let currentSlide = 0;
            
            function updateCarousel() {
                const containerWidth = container.offsetWidth;
                const visibleLogos = Math.max(1, Math.floor(containerWidth / logoWidth));
                const totalSlides = Math.max(1, Math.ceil(logos.length / visibleLogos));
                
                currentSlide = Math.min(currentSlide, totalSlides - 1);
                const translateX = -currentSlide * visibleLogos * logoWidth;
                track.style.transform = `translateX(${translateX}px)`;
                
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === totalSlides - 1;
                
                if (indicatorsContainer) {
                    const indicators = indicatorsContainer.children;
                    for (let i = 0; i < indicators.length; i++) {
                        if (indicators[i].classList.contains('carousel-indicator')) {
                            indicators[i].classList.toggle('active', i === currentSlide);
                        }
                    }
                }
            }
            
            prevBtn.addEventListener('click', () => {
                currentSlide--;
                updateCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                currentSlide++;
                updateCarousel();
            });
            
            window.addEventListener('resize', updateCarousel);
            setTimeout(updateCarousel, 100);
            
            if (indicatorsContainer && indicatorsContainer.children.length === 0) {
                const containerWidth = container.offsetWidth;
                const visibleLogos = Math.max(1, Math.floor(containerWidth / logoWidth));
                const totalSlides = Math.max(1, Math.ceil(logos.length / visibleLogos));
                
                for (let i = 0; i < totalSlides; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
                    indicator.addEventListener('click', () => {
                        currentSlide = i;
                        updateCarousel();
                    });
                    indicatorsContainer.appendChild(indicator);
                }
            }
        });
    }
    initCarousels();

    // ----- CARD FLIP BACK -----
    document.querySelectorAll('.card-flip-back').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const cardInner = this.closest('.card-inner');
            if (cardInner) {
                cardInner.style.transform = 'rotateY(0deg)';
            }
        });
    });

    // ----- ANIMACIÓN DE BARRAS ODS -----
    function initODSProgress() {
        const progressBars = document.querySelectorAll('.ods-progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width || bar.dataset.width || '75%';
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    initODSProgress();

    // ----- VIDEO CONTROLES -----
    function initVideoControls() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            video.addEventListener('play', function() {
                videos.forEach(otherVideo => {
                    if (otherVideo !== this && !otherVideo.paused) {
                        otherVideo.pause();
                    }
                });
            });
            
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
    initVideoControls();

    // ----- DETECTAR CONEXIÓN -----
    function initNetworkStatus() {
        function showNetworkStatus(message, isOnline) {
            const statusDiv = document.createElement('div');
            statusDiv.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: ${isOnline ? '#0f5c3f' : '#c44536'};
                color: white;
                padding: 12px 24px;
                border-radius: 100px;
                font-size: 0.9rem;
                z-index: 9999;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                animation: slideDown 0.3s ease;
            `;
            statusDiv.textContent = message;
            document.body.appendChild(statusDiv);
            
            setTimeout(() => {
                statusDiv.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => statusDiv.remove(), 300);
            }, 3000);
        }
        
        window.addEventListener('online', () => showNetworkStatus('📶 Conexión restablecida', true));
        window.addEventListener('offline', () => showNetworkStatus('📵 Sin conexión a internet', false));
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes slideUp {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
    initNetworkStatus();

    // ----- ACTUALIZAR AÑO EN COPYRIGHT -----
    function updateCopyrightYear() {
        const yearElement = document.querySelector('.copyright p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = `&copy; ${currentYear} BRED Colima IAP. Todos los derechos reservados.`;
        }
    }
    updateCopyrightYear();

    // ----- MENSAJE DE BIENVENIDA -----
    console.log('%c✨ BRED Colima IAP ✨', 'font-size: 20px; font-weight: bold; color: #0f5c3f;');
    console.log('%cJuntos transformamos vidas en Colima.', 'font-size: 14px; color: #1c4e6c;');
    console.log('%cSitio web 100% responsivo y optimizado.', 'font-size: 12px; color: #5f6c68;');
})();