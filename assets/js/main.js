(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight


        if (!header.classList.contains('header-scrolled')) {
            offset -= 20
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')

    const navbar = document.getElementById("navbar");
    var clickIcon = document.getElementById("clickIcon");
    var clickIcon2 = document.getElementById("clickIcon2");


    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 10) {
                selectHeader.classList.add('header-scrolled');
                navbar.classList.add('navbar-visible');
                clickIcon2.classList.add('clickIcon2-hidden');
                clickIcon.classList.add('clickIcon-hidden');
            } else {
                selectHeader.classList.remove('header-scrolled');
                navbar.classList.remove('navbar-visible');
                clickIcon2.classList.add('clickIcon2-hidden');
                clickIcon.classList.remove('clickIcon-hidden');
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-carousel', {
        speed: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-wrap',
                layoutMode: 'fitRows'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function() {
                    AOS.refresh()
                });
            }, true);
        }

    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    });

})()

/**
 * Shoora Custom Js
 */

const navbar = document.getElementById("navbar");
var clickIcon = document.getElementById("clickIcon");
var clickIcon2 = document.getElementById("clickIcon2");
var listIcon = document.querySelector(".listIcon");
var cancelIcon = document.querySelector(".cancelIcon");

clickIcon.onclick = function(event) {
    navbar.classList.add('navbar-visible');
    listIcon.classList.add('listIcon-hidden');
    cancelIcon.classList.add('cancelIcon-visible');
}

clickIcon2.onclick = function(event) {
    navbar.classList.remove('navbar-visible');
    listIcon.classList.remove('listIcon-hidden');
    cancelIcon.classList.remove('cancelIcon-visible');
}

var modal = document.getElementById("myModal");
if (modal) {
    const body = document.querySelector("body");
    window.onload = function() {
        modal.classList.add('modal-visible');
        body.classList.add('body-overflow');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('modal-visible');
            body.classList.remove('body-overflow');
            document.getElementById("my_audio").play();
        }

        var bttn = document.getElementById("myBtn");
        bttn.onclick = function(event) {
            modal.classList.remove('modal-visible');
            body.classList.remove('body-overflow');
            document.getElementById("my_audio").play();
        }

    }
}

var serviceCards = document.querySelector(".service-card");
if (serviceCards) {
    VanillaTilt.init(document.querySelectorAll(".service-card"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 1,
    });
}

fetch('assets/js/reviews.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
    })
    .catch(function(err) {
        console.log(err);
    });

function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        if ((data[i].starRating == 'FIVE' || data[i].starRating == 'FOUR') && data[i].comment) {
            var review = '<div class="bubble" style="animation-delay: ' + i + 's"> <img class="bubble-h1" width="64" height="64" title="' + data[i].reviewer.displayName + '" alt="' + data[i].reviewer.displayName + '" src="' + data[i].reviewer.profilePhotoUrl + '" loading="lazy"> <p class="reviewerName">' + data[i].reviewer.displayName + '</p>';
            if (data[i].starRating == 'FIVE') {
                review += '<i class="star bx bxs-star"></i><i class="star bx bxs-star"></i><i class="star bx bxs-star"></i><i class="star bx bxs-star"></i><i class="star bx bxs-star"></i> ';
            } else {
                review += '<i class="star bx bxs-star"></i><i class="star bx bxs-star"></i><i class="star bx bxs-star"></i><i class="star bx bxs-star"></i><i class="starEmpty bx bxs-star"></i> ';
            }
            if (data[i].comment) {
                review += '<p>' + data[i].comment + '</p>';
            }
            review += '</div>';
            mainContainer.innerHTML += review;
        }
    }
}