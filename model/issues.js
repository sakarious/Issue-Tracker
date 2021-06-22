const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

// const opts = {
//   createdAt: "created_at",
//   updatedAt: "updated_at",
// };

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
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

module.exports = Mongoose.model("Issues", issuesSchema);
