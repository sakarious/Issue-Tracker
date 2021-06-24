"use strict";
const validator = require("./validation");
const { issueModel } = require("../model/issues");
const projectModel = require("../model/project");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;

      projectModel.find({ projectName: project }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          let response = docs;
          res.json(response[0].issues);
        }
      });
    })

    .post(function (req, res) {
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

      let newIssue = new issueModel({
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      });

      //Check if project name exists
      projectModel.find({ projectName: project }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          if (docs.length < 1) {
            let newProject = new projectModel({
              projectName: project,
            });
            newProject.save((err, savedProject) => {
              projectModel.findOneAndUpdate(
                { projectName: savedProject.projectName },
                { $push: { issues: newIssue } },
                { new: true },
                (err, updatedDocs) => {
                  if (err) {
                    console.log("Error from updating saved docs");
                  } else {
                    let response = updatedDocs;
                    let latestIssue =
                      response.issues[response.issues.length - 1];
                    res.json(latestIssue);
                  }
                }
              );
            });
          } else {
            projectModel.findOneAndUpdate(
              { projectName: project },
              { $push: { issues: newIssue } },
              { new: true },
              (err, updatedDocs) => {
                if (err) {
                  console.log("Error from updating saved docs");
                } else {
                  let response = updatedDocs;
                  let latestIssue = response.issues[response.issues.length - 1];
                  res.json(latestIssue);
                }
              }
            );
          }
        }
      });
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
