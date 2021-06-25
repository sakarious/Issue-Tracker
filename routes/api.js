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
          res.json(docs);
          // let response = docs;
          // let issuesArray = response[0].issues;
          // if (_id) {
          //   issuesArray = issuesArray.filter((issue) => issue._id == _id);
          // }
          // if (open) {
          //   open = open == "false" ? false : true;
          //   issuesArray = issuesArray.filter((issue) => issue.open == open);
          // }
          // if (issue_title) {
          //   issuesArray = issuesArray.filter(
          //     (issue) => issue.issue_title == issue_title
          //   );
          // }
          // if (issue_text) {
          //   issuesArray = issuesArray.filter(
          //     (issue) => issue.issue_text == issue_text
          //   );
          // }
          // if (created_by) {
          //   issuesArray = issuesArray.filter(
          //     (issue) => issue.created_by == created_by
          //   );
          // }
          // if (assigned_to) {
          //   issuesArray = issuesArray.filter(
          //     (issue) => issue.assigned_to == assigned_to
          //   );
          // }
          // if (status_text) {
          //   issuesArray = issuesArray.filter(
          //     (issue) => issue.status_text == status_text
          //   );
          // }
          // res.json(issuesArray);
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

      // if (!req.body._id) {
      //   return res.send({ error: "missing _id" });
      // }

      let {
        _id,
        open,
        issue_text,
        issue_title,
        created_by,
        assigned_to,
        status_text,
      } = req.body;

      let fields = {
        "issues.$._id": _id,
        "issues.$.open": open,
        "issues.$.issue_text": issue_text,
        "issues.$.issue_title": issue_title,
        "issues.$.created_by": created_by,
        "issues.$.assigned_to": assigned_to,
        "issues.$.status_text": status_text,
      };

      // let fieldsToUpdate = {};
      // for (const key in req.body) {
      //   if (req.body[key] != undefined || req.body[key] != null) {
      //     fieldsToUpdate[index] = req.body;
      //   }
      // }

      console.log(req.body);
      console.log(fields);
      res.json({ done: "done" });

      // let fieldsToUpdate = {
      //   "issues.$.issue_title": issue_title,
      //   "issues.$.comment": comment,
      // };

      // projectModel.findOneAndUpdate(
      //   {
      //     projectName: project,
      //     "issues._id": _id,
      //   },
      //   {
      //     $set: {
      //       "issues.$.issue_title": issue_title,
      //       "issues.$.comment": comment,
      //     },
      //   }
      // );
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
