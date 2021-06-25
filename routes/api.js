"use strict";
const issueModel = require("../model/issues");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      let {
        _id,
        open,
        issue_text,
        issue_title,
        created_by,
        assigned_to,
        status_text,
      } = req.query;
      console.log(req.query);

      issueModel.find({ projectName: project }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          let issuesArray = docs;
          if (_id) {
            issuesArray = issuesArray.filter((issue) => issue._id == _id);
          }
          if (open) {
            open = open == "false" ? false : true;
            issuesArray = issuesArray.filter((issue) => issue.open == open);
          }
          if (issue_title) {
            issuesArray = issuesArray.filter(
              (issue) => issue.issue_title == issue_title
            );
          }
          if (issue_text) {
            issuesArray = issuesArray.filter(
              (issue) => issue.issue_text == issue_text
            );
          }
          if (created_by) {
            issuesArray = issuesArray.filter(
              (issue) => issue.created_by == created_by
            );
          }
          if (assigned_to) {
            issuesArray = issuesArray.filter(
              (issue) => issue.assigned_to == assigned_to
            );
          }
          if (status_text) {
            issuesArray = issuesArray.filter(
              (issue) => issue.status_text == status_text
            );
          }
          res.json(issuesArray);
        }
      });
    })

    .post(function (req, res) {
      let project = req.params.project;
      console.log(req.body);

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
        projectName: project,
      });

      newIssue.save((err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.json(docs);
        }
      });
    })

    .put(function (req, res) {
      let project = req.params.project;

      if (!req.body._id) {
        return res.send({ error: "missing _id" });
      }

      if (
        req.body._id &&
        !req.body.issue_title &&
        !req.body.issue_text &&
        !req.body.created_by &&
        !req.body.assigned_to &&
        !req.body.status_text &&
        !req.body.open
      ) {
        return res.send({
          error: "no update field(s) sent",
          _id: req.body._id,
        });
      }

      let issueUpdate = {};
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] != "" || req.body[key] != undefined) {
          issueUpdate[key] = req.body[key];
        }

        if (req.body.open) {
          issueUpdate.open = false;
        }
      });

      issueModel.findByIdAndUpdate(
        req.body._id,
        issueUpdate,
        { new: true },
        (err, docs) => {
          if (err) {
            res.send({ error: "could not update", _id: req.body._id });
          } else {
            res.send({ result: "successfully updated", _id: req.body._id });
          }
        }
      );
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
