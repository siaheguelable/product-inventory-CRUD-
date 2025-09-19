function validateVendor(data) {
  const errors = [];
  if (!data.name || typeof data.name !== "string") {
    errors.push({
      field: "name",
      message: "Name is required and must be a string",
    });
  }
  if (!data.email || typeof data.email !== "string") {
    errors.push({
      field: "email",
      message: "Email is required and must be a string",
    });
  }
  if (!data.phone || typeof data.phone !== "string") {
    errors.push({
      field: "phone",
      message: "Phone is required and must be a string",
    });
  }
  return errors;
}
module.exports = { validateVendor };
