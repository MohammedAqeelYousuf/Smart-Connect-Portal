const stars = document.querySelectorAll('.star-rating .fa-star');
const ratingValue = document.getElementById('rating-value');

stars.forEach((star, idx) => {
  star.addEventListener('mouseover', () => {
    stars.forEach((s, i) => {
      if (i <= idx) {
        s.classList.add('hover', 'fa-solid');
        s.classList.remove('fa-regular');
      } else {
        s.classList.remove('hover', 'fa-solid');
        s.classList.add('fa-regular');
      }
    });
  });

  star.addEventListener('mouseout', () => {
    stars.forEach((s) => {
      s.classList.remove('hover');
      if (!s.classList.contains('selected')) {
        s.classList.remove('fa-solid');
        s.classList.add('fa-regular');
      }
    });
  });

  star.addEventListener('click', () => {
    stars.forEach((s, i) => {
      if (i <= idx) {
        s.classList.add('selected', 'fa-solid');
        s.classList.remove('fa-regular');
      } else {
        s.classList.remove('selected', 'fa-solid');
        s.classList.add('fa-regular');
      }
    });
    ratingValue.value = idx + 1;
  });
});

document.getElementById('feedbackForm').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('statusMessage').innerHTML =
    '<div class="alert alert-success">Thank you for your feedback!</div>';
  this.reset();
  
  stars.forEach(s => {
    s.classList.remove('selected', 'fa-solid');
    s.classList.add('fa-regular');
  });
  ratingValue.value = 0;
});
