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

      newIssue.save((err, docs) => {
        if (err) {
          return console.log(err);
        }
        res.json(docs);
      });
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
