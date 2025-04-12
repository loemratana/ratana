// Mobile Menu Toggle
const mobileMenu = document.querySelector('[data-mobile-menu]');
const closeMenuBtn = document.querySelector('[data-mobile-menu-close-btn]');

// Assuming there's an open button outside the nav with data attribute
const openMenuBtn = document.querySelector('[data-mobile-menu-open-btn]');

// Open menu function
function openMenu() {
    mobileMenu.style.transform = 'translateX(0)';
    mobileMenu.style.opacity = '1';
    mobileMenu.style.visibility = 'visible';
}

// Close menu function
function closeMenu() {
    mobileMenu.style.transform = 'translateX(-100%)';
    mobileMenu.style.opacity = '0';
    setTimeout(() => {
        mobileMenu.style.visibility = 'hidden';
    }, 300); // Match this with CSS transition duration
}

// Event listeners
if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMenu);
}
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
}

// Accordion Menu Functionality
const accordionBtns = document.querySelectorAll('[data-accordion-btn]');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        const isOpen = submenu.style.maxHeight && submenu.style.maxHeight !== '0px';
        
        // Close all other accordions
        accordionBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                const otherSubmenu = otherBtn.nextElementSibling;
                otherSubmenu.style.maxHeight = '0px';
                otherBtn.classList.remove('active');
            }
        });

        // Toggle current accordion
        if (isOpen) {
            submenu.style.maxHeight = '0px';
            this.classList.remove('active');
        } else {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            this.classList.add('active');
        }
    });
});

// Add this CSS to make the animations work
const style = document.createElement('style');
style.textContent = `
    [data-mobile-menu] {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100%;
        background: #fff;
        transform: translateX(-100%);
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
        overflow-y: auto;
    }

    .submenu-category-list {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .accordion-menu {
        cursor: pointer;
    }

    .accordion-menu.active .fa-plus {
        display: none;
    }

    .accordion-menu .fa-minus {
        display: none;
    }

    .accordion-menu.active .fa-minus {
        display: inline-block;
    }
`;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    let autoSlideInterval;
  
    // Show the initial slide
    showSlides(slideIndex);
  
    // Auto-play the slideshow
    startAutoSlide();
  
    // Expose functions to global scope for onclick events
    window.plusSlides = function(n) {
      clearInterval(autoSlideInterval);
      showSlides(slideIndex += n);
      startAutoSlide();
    };
  
    window.currentSlide = function(n) {
      clearInterval(autoSlideInterval);
      showSlides(slideIndex = n);
      startAutoSlide();
    };
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        plusSlides(1);
      }, 5000); // Change slide every 5 seconds
    }
  
    function showSlides(n) {
      const slides = document.getElementsByClassName("mySlides");
      const thumbnails = document.getElementsByClassName("demo");
      const captionText = document.getElementById("caption");
  
      // Loop through slides
      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }
  
      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
  
      // Remove active class from all thumbnails
      for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");
      }
  
      // Show current slide and set active thumbnail
      slides[slideIndex - 1].style.display = "block";
      thumbnails[slideIndex - 1].className += " active";
      captionText.innerHTML = thumbnails[slideIndex - 1].alt;
    }
  
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
  
    sliderContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  });


  // Toggle form visibility
  const productLink = document.querySelector('.product-link');
  const formContainer = document.querySelector('.product-form-container');
  const categoryLink = document.querySelector('.category-link');

  productLink.addEventListener('click', (e) => {
      e.preventDefault();
      formContainer.classList.toggle('active');
  });

  // Optional: Placeholder for category link
  categoryLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Category functionality not implemented yet.');
  });

  // Show/hide discount input based on badge selection
  const badgeSelect = document.querySelector('#badge');
  const discountGroup = document.querySelector('#discount-value-group');

  badgeSelect.addEventListener('change', () => {
      discountGroup.style.display = badgeSelect.value === 'discount' ? 'block' : 'none';
  });

  // Basic form submission handling (for demo)
  const form = document.querySelector('#product-form');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Product submitted! (This is a demo; no data is saved.)');
      form.reset();
      formContainer.classList.remove('active');
      discountGroup.style.display = 'none';
  });