function validateProduct(data) {
  const errors = [];
  if (!data.name || typeof data.name !== "string") {
    errors.push({
      field: "name",
      message: "Name is required and must be a string",
    });
  }
  if (!data.price || typeof data.price !== "number") {
    errors.push({
      field: "price",
      message: "Price is required and must be a number",
    });
  }
  if (!data.category || typeof data.category !== "string") {
    errors.push({
      field: "category",
      message: "Category is required and must be a string",
    });
  }
  return errors;
}
module.exports = { validateProduct };
