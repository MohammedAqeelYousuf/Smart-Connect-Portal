document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm') as HTMLFormElement | null;
  const subject = document.getElementById('subject') as HTMLInputElement | null;
  const message = document.getElementById('message') as HTMLTextAreaElement | null;
  const category = document.getElementById('category') as HTMLSelectElement | null;

  const subjectError = document.getElementById('subjectError') as HTMLElement | null;
  const messageError = document.getElementById('messageError') as HTMLElement | null;
  const categoryError = category?.nextElementSibling as HTMLElement | null;

  if (!form || !subject || !message || !category || !subjectError || !messageError || !categoryError) {
    console.error('Form or one of the required elements is missing.');
    return;
  }

  form.addEventListener('submit', function (event) {
    let isValid = true;

    
    subjectError.style.display = 'none';
    messageError.style.display = 'none';
    categoryError.style.display = 'none';


    subject.classList.remove('is-invalid');
    message.classList.remove('is-invalid');
    category.classList.remove('is-invalid');


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

    
    if (message.value.trim() === '') {
      messageError.textContent = 'Feedback is required.';
      messageError.style.display = 'block';
      message.classList.add('is-invalid');
      isValid = false;
    }


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
