const validateForm = (formData) => {
  const { title, author, year, rating } = formData;
  const errors = {};

  if (!title) {
    errors.title = 'Title is required';
  }

  if (!author) {
    errors.author = 'Author is required';
  }

  if (!year || isNaN(year) || year > new Date().getFullYear()) {
    errors.year = 'Invalid year';
  }

  if (!rating || isNaN(rating) || rating < 1 || rating > 10) {
    errors.rating = 'Invalid rating';
  }

  return errors;
};

export default validateForm;


  