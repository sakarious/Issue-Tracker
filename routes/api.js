"use strict";
const validator = require("./validation");
const issuesModel = require("../model/issues");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
    })

    .post(function (req, res) {
      let project = req.params.project;
      const { error, isValid } = validator.issueCreation(
        req.body.issue_title,
        req.body.issue_text,
        req.body.created_by
      );
      if (!isValid) {
        console.log(error);
        return res.json({ error: "required field(s) missing" });
      }
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
