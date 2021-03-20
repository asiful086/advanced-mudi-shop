module.exports.validateCategoryInput = (name, photo) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "name must not be empty";
  }
  // if (photo.length < 1) {
  //   errors.photo = "photo must be provided";
  // }

  // if (photo.length > 1) {
  //   errors.photo = "upload single image please";
  // }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
