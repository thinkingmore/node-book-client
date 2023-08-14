const validateForm = (formData) => {
  const { title, author, published, rating } = formData;
  const errors = {};

  if (!title) {
    errors.title = 'Title is required';
  }

  if (!author) {
    errors.author = 'Author is required';
  }

  if (!published || isNaN(published) || published > new Date().getFullYear()) {
    errors.published = 'Invalid published year';
  }

  if (!rating || isNaN(rating) || rating < 1 || rating > 10) {
    errors.rating = 'Invalid rating';
  }

  return errors;
};

export default validateForm;


  