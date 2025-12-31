document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. PRELOADER & INITIALIZATION --- */
    const preloader = document.getElementById('preloader');
        /* --- VERTICAL CAROUSEL LOGIC --- */
    const track = document.getElementById('track');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const scrollThumb = document.getElementById('scroll-thumb');
    
    // Configuration
    const itemHeight = 115; 
    let currentIndex = 0;
    
    // We subtract 3 because 3 items are always visible on screen
    const items = document.querySelectorAll('.op-row');
    const maxIndex = Math.max(0, items.length - 3);

    function updateCarousel() {
        // 1. Move the Track Up/Down
        const translateY = -(currentIndex * itemHeight);
        track.style.transform = `translateY(${translateY}px)`;
        
        const progress = currentIndex / maxIndex;

        const thumbTop = progress * 170; 
        
        // Handle case where there's no scrolling needed
        if (maxIndex === 0) {
            scrollThumb.style.top = '0px';
        } else {
            scrollThumb.style.top = `${thumbTop}px`;
        }
    }

    // Button Listeners
    if(downBtn && upBtn) {
        downBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        upBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 2000);

    /* --- 2. CLICK TARGET RIPPLE EFFECT --- */
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        // Center the ripple on click
        ripple.style.left = (e.clientX - 10) + 'px'; 
        ripple.style.top = (e.clientY - 10) + 'px';
        
        document.getElementById('ripple-container').appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    /* --- 3. DESKTOP PARALLAX EFFECT --- */
    const heroSection = document.getElementById('hero');
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');

    if (window.innerWidth > 768) { 

        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            layer1.style.transform = `translate(-${x * 0.05}%, -${y * 0.05}%)`;
            layer2.style.transform = `translate(${x * 0.1}%, ${y * 0.1}%)`;
        });
    }

    /* --- 4. SCROLL REVEAL --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* --- 5. BOTTOM DOCK ACTIVE STATE --- */
    const sections = document.querySelectorAll('section');
    const dockItems = document.querySelectorAll('.dock-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    /* --- 6. FORM SUBMIT --- */
const form = document.getElementById('comms-form');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznKY_iFlJkSF-oexTcEB0WDwHsZklJK123aZOiGxyRpQwel_8mtxNvmO4gtasxpS8BuQ/exec';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const original = btn.innerText;
    
    btn.innerText = "UPLOADING...";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    
    try {
        const formData = {
            codename: form.querySelector('[name="codename"]').value,
            phone: form.querySelector('[name="phone"]').value,
            email: form.querySelector('[name="email"]').value,
            objective: form.querySelector('[name="objective"]').value,
            message: form.querySelector('[name="message"]').value
        };
        
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
       
        
        alert("COMMAND: TRANSMISSION SECURED. DATA ARCHIVED. STANDBY FOR REPLY.");
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert("COMMAND: TRANSMISSION INTERRUPTED. ATTEMPTING TO REROUTE...");
    } finally {
        btn.innerText = original;
        btn.style.opacity = "1";
        btn.disabled = false;
    }
});

});
