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
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!navMobile.contains(e.target) && !menuToggle.contains(e.target)) {
                navMobile.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // ----- HEADER SCROLL EFFECT -----
    const header = document.getElementById('mainHeader');
    const backTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        if (backTop) {
            backTop.classList.toggle('visible', window.scrollY > 400);
        }
    });

    // ----- BACK TO TOP -----
    if (backTop) {
        backTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                if (navMobile) {
                    navMobile.classList.remove('active');
                }
                
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
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
            }).catch(() => {
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

    // ----- GRÁFICAS CHART.JS -----
    function initCharts() {
        if (typeof Chart === 'undefined') return;
        
        const distributionCtx = document.getElementById('distributionChart');
        if (distributionCtx) {
            new Chart(distributionCtx, {
                type: 'pie',
                data: {
                    labels: ['Ropa', 'Material Const.', 'Varios', 'Accesorios', 'Muebles', 'Zapatos', 'Enseres'],
                    datasets: [{
                        data: [11448, 7052, 3540, 1409, 528, 528, 883],
                        backgroundColor: ['#A8E6CF', '#FFD3B6', '#FFB5B5', '#D4A5A5', '#B5EAD7', '#C7CEE6', '#FDFD96'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
                }
            });
        }
        
        const conditionCtx = document.getElementById('conditionChart');
        if (conditionCtx) {
            new Chart(conditionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Nuevo', 'Usado'],
                    datasets: [{
                        data: [12, 88],
                        backgroundColor: ['#C1E1C1', '#B5C9C3'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
                }
            });
        }
        
        const populationCtx = document.getElementById('populationChart');
        if (populationCtx) {
            new Chart(populationCtx, {
                type: 'bar',
                data: {
                    labels: ['Niños', 'Jóvenes', 'Adultos', 'Ancianos'],
                    datasets: [
                        { label: 'Hombres', data: [120, 349, 914, 337], backgroundColor: '#A7C7E7', borderRadius: 8 },
                        { label: 'Mujeres', data: [73, 307, 1606, 358], backgroundColor: '#FAC8CD', borderRadius: 8 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } } },
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
                }
            });
        }
        
        const urbanCtx = document.getElementById('urbanRuralChart');
        if (urbanCtx) {
            new Chart(urbanCtx, {
                type: 'pie',
                data: {
                    labels: ['Urbano', 'Rural'],
                    datasets: [{
                        data: [983, 3081],
                        backgroundColor: ['#E6E6FA', '#D3D3D3'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
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
        const images = Array.from(galleryItems).map(item => item.querySelector('img')?.src).filter(src => src);
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                lightboxImg.src = images[currentIndex];
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex];
        };
        
        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex];
        };
        
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        if (prevBtn) prevBtn.addEventListener('click', prevImage);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
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
    
    window.addEventListener('load', initMap);

    // ----- CARRUSELES DE ALIANZAS -----
    function initCarousels() {
        document.querySelectorAll('.carousel-track').forEach(track => {
            const category = track.dataset.category;
            const container = track.closest('.carousel-container');
            const prevBtn = document.querySelector(`.carousel-btn.prev[data-category="${category}"]`);
            const nextBtn = document.querySelector(`.carousel-btn.next[data-category="${category}"]`);
            const indicatorsContainer = document.querySelector(`.carousel-indicators[data-category="${category}"]`);
            
            if (!container || !prevBtn || !nextBtn) return;
            
            const logos = track.querySelectorAll('.alliance-logo');
            if (!logos.length) return;
            
            const logoWidth = 205; // 180 + gap
            let currentSlide = 0;
            
            const updateCarousel = () => {
                const containerWidth = container.offsetWidth;
                const visibleLogos = Math.max(1, Math.floor(containerWidth / logoWidth));
                const totalSlides = Math.max(1, Math.ceil(logos.length / visibleLogos));
                
                currentSlide = Math.min(currentSlide, totalSlides - 1);
                track.style.transform = `translateX(-${currentSlide * visibleLogos * logoWidth}px)`;
                
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === totalSlides - 1;
                
                if (indicatorsContainer) {
                    Array.from(indicatorsContainer.children).forEach((ind, i) => {
                        ind.classList.toggle('active', i === currentSlide);
                    });
                }
            };
            
            prevBtn.addEventListener('click', () => { currentSlide--; updateCarousel(); });
            nextBtn.addEventListener('click', () => { currentSlide++; updateCarousel(); });
            
            window.addEventListener('resize', updateCarousel);
            setTimeout(updateCarousel, 100);
            
            if (indicatorsContainer && !indicatorsContainer.children.length) {
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

    // ----- CARD FLIP -----
    const flipBtn = document.getElementById('flipHistoryBtn');
    const flipBackBtn = document.getElementById('flipBackBtn');
    const historyCard = document.getElementById('historyCard');
    
    if (flipBtn && historyCard) {
        flipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            historyCard.style.transform = 'rotateY(180deg)';
        });
    }
    
    if (flipBackBtn && historyCard) {
        flipBackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            historyCard.style.transform = 'rotateY(0deg)';
        });
    }

    // ----- ANIMACIÓN DE BARRAS ODS -----
    function initODSProgress() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width || bar.dataset.width || '75%';
                    bar.style.width = '0%';
                    setTimeout(() => { bar.style.width = width; }, 200);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.ods-progress-fill').forEach(bar => observer.observe(bar));
    }
    initODSProgress();

    // ----- VIDEO CONTROLES -----
    function initVideoControls() {
        document.querySelectorAll('video').forEach(video => {
            video.addEventListener('play', function() {
                document.querySelectorAll('video').forEach(other => {
                    if (other !== this && !other.paused) other.pause();
                });
            });
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
    initVideoControls();

    // ===== DESCARGA DE GRÁFICAS COMO PDF REAL CON PORCENTAJES =====
    const downloadChartsBtn = document.getElementById('downloadChartsPDF');
    if (downloadChartsBtn) {
        downloadChartsBtn.addEventListener('click', async function() {
            try {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
                this.disabled = true;
                
                const chartContainers = document.querySelectorAll('.chart-container');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                const chartData = {
                    distributionChart: {
                        title: 'Distribución de Artículos',
                        data: [11448, 7052, 3540, 1409, 528, 528, 883],
                        labels: ['Ropa', 'Material Const.', 'Varios', 'Accesorios', 'Muebles', 'Zapatos', 'Enseres'],
                        total: 25388
                    },
                    conditionChart: {
                        title: 'Nuevos vs Usados',
                        data: [12, 88],
                        labels: ['Nuevo', 'Usado'],
                        total: 100
                    },
                    populationChart: {
                        title: 'Población Atendida',
                        data: {
                            hombres: [120, 349, 914, 337],
                            mujeres: [73, 307, 1606, 358],
                            labels: ['Niños', 'Jóvenes', 'Adultos', 'Ancianos']
                        },
                        total: 4064
                    },
                    urbanRuralChart: {
                        title: 'Urbano/Rural',
                        data: [983, 3081],
                        labels: ['Urbano', 'Rural'],
                        total: 4064
                    }
                };
                
                for (let i = 0; i < chartContainers.length; i++) {
                    const container = chartContainers[i];
                    const chartId = container.querySelector('canvas')?.id;
                    if (!chartId || !chartData[chartId]) continue;
                    
                    const canvas = await html2canvas(container, {
                        scale: 2,
                        backgroundColor: '#ffffff',
                        logging: false,
                        allowTaint: true,
                        useCORS: true
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pdfWidth - 40;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    if (i > 0) pdf.addPage();
                    
                    // Título
                    pdf.setFontSize(18);
                    pdf.setTextColor(15, 92, 63);
                    pdf.setFont(undefined, 'bold');
                    pdf.text(20, 30, chartData[chartId].title);
                    
                    // Imagen
                    pdf.addImage(imgData, 'PNG', 20, 50, imgWidth, imgHeight - 40);
                    
                    // Línea separadora
                    let yPosition = 50 + imgHeight - 20;
                    pdf.setDrawColor(200, 200, 200);
                    pdf.line(20, yPosition - 5, pdfWidth - 20, yPosition - 5);
                    
                    // Título tabla
                    pdf.setFontSize(14);
                    pdf.setTextColor(15, 92, 63);
                    pdf.setFont(undefined, 'bold');
                    pdf.text(20, yPosition + 5, 'Distribución por porcentajes:');
                    
                    yPosition += 20;
                    
                    // Tabla según tipo
                    if (chartId === 'distributionChart') {
                        const data = chartData.distributionChart;
                        let tableY = yPosition;
                        
                        data.labels.forEach((label, j) => {
                            const percentage = ((data.data[j] / data.total) * 100).toFixed(1);
                            const text = `${label}: ${data.data[j].toLocaleString()} artículos (${percentage}%)`;
                            
                            if (j % 2 === 0) {
                                pdf.text(20, tableY, text);
                            } else {
                                pdf.text(pdfWidth / 2, tableY, text);
                                tableY += 15;
                            }
                        });
                        
                    } else if (chartId === 'conditionChart') {
                        const data = chartData.conditionChart;
                        pdf.text(20, yPosition, `${data.labels[0]}: ${data.data[0]}%`);
                        pdf.text(pdfWidth / 2, yPosition, `${data.labels[1]}: ${data.data[1]}%`);
                        
                    } else if (chartId === 'populationChart') {
                        const data = chartData.populationChart;
                        let tableY = yPosition;
                        
                        pdf.setFontSize(12);
                        pdf.setTextColor(15, 92, 63);
                        pdf.setFont(undefined, 'bold');
                        pdf.text(20, tableY, 'Hombres:');
                        pdf.text(pdfWidth / 2, tableY, 'Mujeres:');
                        
                        tableY += 20;
                        
                        data.data.labels.forEach((label, j) => {
                            const hombres = data.data.hombres[j];
                            const mujeres = data.data.mujeres[j];
                            const totalCat = hombres + mujeres;
                            
                            pdf.setFontSize(10);
                            pdf.setTextColor(46, 59, 55);
                            pdf.setFont(undefined, 'normal');
                            
                            pdf.text(20, tableY, `${label}: ${hombres} (${((hombres/totalCat)*100).toFixed(1)}%)`);
                            pdf.text(pdfWidth / 2, tableY, `${label}: ${mujeres} (${((mujeres/totalCat)*100).toFixed(1)}%) - ${((totalCat/data.total)*100).toFixed(1)}% del total`);
                            
                            tableY += 15;
                        });
                        
                    } else if (chartId === 'urbanRuralChart') {
                        const data = chartData.urbanRuralChart;
                        pdf.text(20, yPosition, `${data.labels[0]}: ${data.data[0].toLocaleString()} personas (${((data.data[0]/data.total)*100).toFixed(1)}%)`);
                        pdf.text(pdfWidth / 2, yPosition, `${data.labels[1]}: ${data.data[1].toLocaleString()} personas (${((data.data[1]/data.total)*100).toFixed(1)}%)`);
                    }
                    
                    // Total
                    if (chartData[chartId]?.total) {
                        pdf.setFontSize(12);
                        pdf.setTextColor(15, 92, 63);
                        pdf.setFont(undefined, 'bold');
                        
                        if (chartId === 'distributionChart') {
                            pdf.text(20, pdfHeight - 40, `TOTAL: ${chartData[chartId].total.toLocaleString()} artículos`);
                        } else if (chartId === 'populationChart' || chartId === 'urbanRuralChart') {
                            pdf.text(20, pdfHeight - 40, `TOTAL: ${chartData[chartId].total.toLocaleString()} personas beneficiadas`);
                        }
                    }
                }
                
                pdf.save('graficas-impacto-bred.pdf');
                this.innerHTML = originalText;
                this.disabled = false;
                alert('✅ PDF generado exitosamente');
                
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Error al generar el PDF');
                this.innerHTML = '<i class="fas fa-download"></i> Descargar Gráficas PDF';
                this.disabled = false;
            }
        });
    }

    // ===== MEJORA PARA VIDEOS - OPTIMIZAR VISUALIZACIÓN DE ROSTROS =====
    function optimizeVideos() {
        document.querySelectorAll('#testimonioVideo video, #testimonio2Video video').forEach(video => {
            video.style.objectPosition = 'center 20%';
        });
    }
    
    window.addEventListener('load', optimizeVideos);

    // ===== MEJORA PARA CENTRAR PROGRAMA DE CONTINGENCIA =====
    function centerContingencia() {
        const programsGrid = document.getElementById('programsGrid');
        if (!programsGrid) return;
        
        const programCards = programsGrid.querySelectorAll('.program-card');
        if (programCards.length === 7) {
            programCards[programCards.length - 1].style.gridColumn = window.innerWidth >= 1200 ? '2 / span 1' : 'auto';
        }
    }
    
    window.addEventListener('load', centerContingencia);
    window.addEventListener('resize', centerContingencia);

    // ----- DETECTAR CONEXIÓN -----
    function initNetworkStatus() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
            @keyframes slideUp { from { opacity:1; transform:translateX(-50%) translateY(0); } to { opacity:0; transform:translateX(-50%) translateY(-20px); } }
        `;
        document.head.appendChild(style);
        
        const showMessage = (msg, isOnline) => {
            const div = document.createElement('div');
            div.style.cssText = `
                position:fixed; top:100px; left:50%; transform:translateX(-50%);
                background:${isOnline ? '#0f5c3f' : '#c44536'}; color:white;
                padding:12px 24px; border-radius:100px; font-size:0.9rem;
                z-index:9999; box-shadow:0 10px 30px rgba(0,0,0,0.2);
                animation:slideDown 0.3s ease;
            `;
            div.textContent = msg;
            document.body.appendChild(div);
            setTimeout(() => {
                div.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => div.remove(), 300);
            }, 3000);
        };
        
        window.addEventListener('online', () => showMessage('📶 Conexión restablecida', true));
        window.addEventListener('offline', () => showMessage('📵 Sin conexión a internet', false));
    }
    initNetworkStatus();

    // ----- ACTUALIZAR AÑO EN COPYRIGHT -----
    function updateCopyrightYear() {
        const yearElement = document.querySelector('.copyright p');
        if (yearElement) {
            yearElement.innerHTML = `&copy; ${new Date().getFullYear()} BRED Colima IAP. Todos los derechos reservados.`;
        }
    }
    updateCopyrightYear();

    // ----- MENSAJE DE BIENVENIDA -----
    console.log('%c✨ BRED Colima IAP ✨', 'font-size:20px; font-weight:bold; color:#0f5c3f;');
    console.log('%cJuntos transformamos vidas en Colima.', 'font-size:14px; color:#1c4e6c;');
    console.log('%cSitio web 100% responsivo y optimizado.', 'font-size:12px; color:#5f6c68;');

})();