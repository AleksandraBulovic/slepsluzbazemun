const reviews = Array.isArray(window.manualReviews) ? window.manualReviews : [];
const reviewText = document.querySelector('#review');
const reviewCard = document.querySelector('.reviewbox article');
const reviewAuthor = document.querySelector('#author');
const reviewImage = document.querySelector('#review-image');
const reviewStars = document.querySelector('#review-stars');
const reviewDate = document.querySelector('#review-date');
const reviewStatus = document.querySelector('#review-status');
const reviewDots = document.querySelector('#dots');
const rating = document.querySelector('#rating');
const ratingStars = document.querySelector('#rating-stars');
const reviewCount = document.querySelector('#count');

let currentReview = 0;
let carouselTimer;
let hasRenderedReview = false;

function updateReviewSummary() {
    const hasExamples = reviews.some(review => review.isExample);
    reviewCount.textContent = hasExamples
        ? ''
        : `${reviews.length} ručno unetih recenzija`;

    if (hasExamples) {
        rating.textContent = '';
        ratingStars.textContent = '';
        return;
    }

    const averageRating = reviews.length
        ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
        : 0;
    rating.textContent = averageRating ? averageRating.toFixed(1) : '';
    ratingStars.textContent = averageRating ? '★★★★★' : '';
    reviewStatus.textContent = 'Recenzije su unete ručno; ne preuzimaju se niti potvrđuju preko Google-a.';
}

function renderReview() {
    if (reviews.length === 0) {
        reviewText.textContent = 'Trenutno nema unetih recenzija.';
        reviewAuthor.textContent = '';
        reviewImage.hidden = true;
        reviewStars.textContent = '';
        reviewDate.textContent = '';
        reviewDots.replaceChildren();
        return;
    }

    const review = reviews[currentReview];
    const score = Math.min(5, Math.max(0, Math.round(Number(review.rating) || 0)));
    reviewText.textContent = review.text || '';
    reviewAuthor.textContent = review.reviewer || 'Anonimno';
    reviewStars.textContent = `${'★'.repeat(score)}${'☆'.repeat(5 - score)}`;
    reviewDate.textContent = review.date || '';

    if (review.image) {
        reviewImage.src = review.image;
        reviewImage.hidden = false;
    } else {
        reviewImage.removeAttribute('src');
        reviewImage.hidden = true;
    }

    reviewDots.replaceChildren();
    reviews.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = index === currentReview ? 'active' : '';
        dot.setAttribute('aria-label', `Prikaži recenziju ${index + 1}`);
        dot.addEventListener('click', () => {
            currentReview = index;
            renderReview();
            restartCarousel();
        });
        reviewDots.append(dot);
    });

    if (hasRenderedReview && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reviewCard.animate(
            [
                { opacity: 0.55, transform: 'translateY(7px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 260, easing: 'ease-out' }
        );
    }
    hasRenderedReview = true;
}

function showNextReview(direction = 1) {
    currentReview = (currentReview + direction + reviews.length) % reviews.length;
    renderReview();
}

function restartCarousel() {
    clearInterval(carouselTimer);
    if (reviews.length > 1) {
        carouselTimer = setInterval(() => showNextReview(), 6000);
    }
}

document.querySelector('#next').addEventListener('click', () => {
    if (reviews.length > 1) {
        showNextReview();
        restartCarousel();
    }
});

document.querySelector('#prev').addEventListener('click', () => {
    if (reviews.length > 1) {
        showNextReview(-1);
        restartCarousel();
    }
});

document.querySelector('#menu').addEventListener('click', () => {
    const nav = document.querySelector('#nav');
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
    nav.style.position = 'absolute';
    nav.style.top = `${document.querySelector('header').offsetHeight}px`;
    nav.style.right = '18px';
    nav.style.flexDirection = 'column';
    nav.style.background = '#192433';
    nav.style.padding = '20px';
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

const galleryLightbox = document.querySelector('#gallery-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
let galleryOpener;

document.querySelectorAll('.gallery img').forEach((image, index) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Otvori fotografiju ${index + 1}`);
});

document.querySelector('.gallery').addEventListener('click', event => {
    const image = event.target.closest('img');
    if (!image) return;

    galleryOpener = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || `Fotografija ${[...document.querySelectorAll('.gallery img')].indexOf(image) + 1}`;
    galleryLightbox.showModal();
    lightboxClose.focus();
});

document.querySelector('.gallery').addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('img')) {
        event.preventDefault();
        event.target.click();
    }
});

lightboxClose.addEventListener('click', () => galleryLightbox.close());
galleryLightbox.addEventListener('click', event => {
    if (event.target === galleryLightbox) galleryLightbox.close();
});
galleryLightbox.addEventListener('close', () => galleryOpener?.focus());

updateReviewSummary();
renderReview();
restartCarousel();
