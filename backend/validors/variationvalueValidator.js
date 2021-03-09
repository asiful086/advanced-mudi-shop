module.exports.validateVariationvalueInput = (name, variation) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "name must not be empty";
  }

  if (variation.trim() === "") {
    errors.variation = "variation must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
