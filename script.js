document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if(otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Pricing Tier Selection & Form Logic
    const priceCards = document.querySelectorAll('.price-card');
    const checkoutForm = document.getElementById('checkoutForm');
    const selectedTierDisplay = document.getElementById('selectedTier');
    const paymentForm = document.getElementById('paymentForm');
    
    let currentTierLink = '';

    priceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all
            priceCards.forEach(c => {
                c.classList.remove('selected');
                c.querySelector('.btn-tier').textContent = 'Pilih Ini';
            });
            
            // Add selected class to clicked
            card.classList.add('selected');
            card.querySelector('.btn-tier').textContent = 'Terpilih ✓';
            
            // Get data
            const tierValue = card.getAttribute('data-tier');
            currentTierLink = card.getAttribute('data-link');
            
            // Update UI
            const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tierValue);
            selectedTierDisplay.textContent = formattedPrice;
            
            // Show form with slide animation
            checkoutForm.style.display = 'block';
            
            // Scroll down a bit to show form
            setTimeout(() => {
                checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    });

    // Form Submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulating processing
        const btnSubmit = paymentForm.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = 'Mengarahkan... ⏳';
        btnSubmit.disabled = true;

        setTimeout(() => {
            // Redirect to the payment gateway link
            window.location.href = currentTierLink;
            
            // Reset button (in case they use back button)
            setTimeout(() => {
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }, 1000);
        }, 800);
    });
});
