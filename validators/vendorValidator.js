function validateVendor(data) {
  const errors = [];
  if (!data.name || typeof data.name !== "string") {
    errors.push({
      field: "name",
      message: "Name is required and must be a string",
    });
  }
  if (!data.address || typeof data.address !== "string") {
    errors.push({
      field: "address",
      message: "Address is required and must be a string",
    });
  }
  if (
    !data.contact ||
    typeof data.contact !== "object" ||
    !data.contact.email ||
    typeof data.contact.email !== "string"
  ) {
    errors.push({
      field: "email",
      message: "Email is required and must be a string",
    });
  }
  if (
    !data.contact ||
    typeof data.contact !== "object" ||
    !data.contact.phone ||
    typeof data.contact.phone !== "string"
  ) {
    errors.push({
      field: "phone",
      message: "Phone is required and must be a string",
    });
  }
  return errors;
}
module.exports = { validateVendor };
