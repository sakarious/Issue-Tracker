const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const issuesSchema = new Schema(
  {
    issue_title: {
      type: String,
      required: true,
    },

    issue_text: {
      type: String,
      required: true,
    },

    created_by: {
      type: String,
      required: true,
    },

    assigned_to: {
      type: String,
    },

    status_text: {
      type: String,
    },

    open: {
      type: Boolean,
      default: true,
    },

    projectName: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

module.exports = Mongoose.model("issues", issuesSchema);
