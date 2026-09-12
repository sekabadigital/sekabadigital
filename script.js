document.addEventListener("DOMContentLoaded", function() {
    
    // 1. STICKY NAVBAR LOGIC
    // Mengubah tampilan navbar saat user scroll ke bawah
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", function() {
        // Jika scroll lebih dari 50px, tambahkan class 'scrolled'
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. SCROLL TRIGGERED ANIMATION (INTERSECTION OBSERVER)
    // Membuat elemen muncul perlahan (fade-in/up) saat terlihat di layar
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, // Animasi terpicu saat 15% elemen terlihat di layar
        rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen benar-benar masuk
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Lewati jika belum masuk layar
            } else {
                // Tambahkan class 'active' untuk menjalankan transisi CSS
                entry.target.classList.add("active");
                // Hentikan observasi setelah animasi berjalan sekali (performa lebih baik)
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Terapkan observer ke semua elemen dengan class .reveal
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});