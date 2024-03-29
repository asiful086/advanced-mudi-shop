module.exports.validateProductInput = (name) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "name must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
