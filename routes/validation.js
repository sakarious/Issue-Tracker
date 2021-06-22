module.exports = class Validation {
  static issueCreation(title, text, createdBy) {
    let error = {};

    if (
      title.trim().length == 0 ||
      text.trim().length == 0 ||
      createdBy.trim().length == 0
    ) {
      error.description = "title, text or created_by fields cannot be empty";
    }

    return { error, isValid: Object.keys(error).length == 0 };
  }
};
