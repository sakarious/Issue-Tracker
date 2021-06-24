"use strict";
const validator = require("./validation");
const { issueModel } = require("../model/issues");
const projectModel = require("../model/project");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      issuesModel.find({}, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.json(docs);
        }
      });
    })

    .post(async function (req, res) {
      let project = req.params.project;

      if (
        !req.body.issue_text ||
        !req.body.issue_title ||
        !req.body.created_by
      ) {
        return res.send({ error: "required field(s) missing" });
      }
      let issue_title = req.body.issue_title;
      let issue_text = req.body.issue_text;
      let created_by = req.body.created_by;
      let assigned_to = req.body.assigned_to ? req.body.assigned_to : "";
      let status_text = req.body.status_text ? req.body.status_text : "";

      let newProject = await new projectModel({
        projectName: project,
      });

      let newIssue = await new issueModel({
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      });

      //Check if project name exists
      let foundProject = await projectModel.find({ projectName: project });

      //Declear SavedIssue
      let newIssue;

      //If project already exists, add issue to project, else, create project and add issue to project
      if (foundProject) {
        newIssue = projectModel.findOneAndUpdate(
          { projectName: project },
          { $push: { issues: newIssue } },
          { new: true }
        );
      }
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
