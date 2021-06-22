module.exports = class Validation {
  static issueCreation(title, text, createdBy) {
    let error = {};

    if (
      typeof title == undefined ||
      typeof title == undefined ||
      typeof createdBy == undefined
    ) {
      error.description = "title, text or created_by fields cannot be empty";
    }

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
