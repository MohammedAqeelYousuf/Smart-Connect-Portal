document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  const category = document.getElementById('category');

  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  const categoryError = category.nextElementSibling; // targets .invalid-feedback

  form.addEventListener('submit', function (event) {
    let isValid = true;

    // Reset all error messages
    subjectError.style.display = 'none';
    messageError.style.display = 'none';
    categoryError.style.display = 'none';

    subject.classList.remove('is-invalid');
    message.classList.remove('is-invalid');
    category.classList.remove('is-invalid');

    // Subject validation
    if (subject.value.trim() === '') {
      subjectError.textContent = 'Subject is required.';
      subjectError.style.display = 'block';
      subject.classList.add('is-invalid');
      isValid = false;
    } else if (subject.value.trim().length > 20) {
      subjectError.textContent = 'Subject must not exceed 20 characters.';
      subjectError.style.display = 'block';
      subject.classList.add('is-invalid');
      isValid = false;
    }

    // Message (feedback) validation
    if (message.value.trim() === '') {
      messageError.textContent = 'Feedback is required.';
      messageError.style.display = 'block';
      message.classList.add('is-invalid');
      isValid = false;
    }

    // Category validation
    if (category.value.trim() === '') {
      categoryError.textContent = 'Please select a category.';
      categoryError.style.display = 'block';
      category.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      alert('Feedback submitted successfully!');
    }

    form.classList.add('was-validated');
  });
});
