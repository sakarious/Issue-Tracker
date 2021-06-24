const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const { issuesSchema } = require("./issues");

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },

  issues: [issuesSchema],
});

module.exports = Mongoose.model("projects", projectSchema);
