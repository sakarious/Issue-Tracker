const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const server = require("../server");
const issuesModel = require("../model/issues");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    let newIssue = {
      assigned_to: "John Doe",
      status_text: "New Issue, Treat as urgent",
      issue_title: "First test with all fields",
      issue_text: "Test 1",
      created_by: "Sakarious",
    };
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send(newIssue)
      .end(function (err, res) {
        //console.log(res.body);
        assert.equal(res.status, 200);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("open");
        res.body.should.have.property("issue_title");
        res.body.should.have.property("issue_text");
        res.body.should.have.property("created_by");
        res.body.should.have.property("assigned_to");
        res.body.should.have.property("status_text");
        res.body.should.have.property("created_on");
        res.body.should.have.property("updated_on");
        assert.equal(res.body.open, true);
        assert.equal(res.body.issue_title, "First test with all fields");
        assert.equal(res.body.issue_text, "Test 1");
        assert.equal(res.body.created_by, "Sakarious");
        done();
      });
  });

  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    let newIssue = {
      issue_title: "Second test with only required fields",
      issue_text: "Test 2",
      created_by: "Sakarious",
    };
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send(newIssue)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("open");
        res.body.should.have.property("issue_title");
        res.body.should.have.property("issue_text");
        res.body.should.have.property("created_by");
        res.body.should.have.property("assigned_to");
        res.body.should.have.property("status_text");
        res.body.should.have.property("created_on");
        res.body.should.have.property("updated_on");
        assert.equal(res.body.open, true);
        assert.equal(
          res.body.issue_title,
          "Second test with only required fields"
        );
        assert.equal(res.body.issue_text, "Test 2");
        assert.equal(res.body.created_by, "Sakarious");
        done();
      });
  });

  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    let newIssue = {
      issue_title: "",
      issue_text: "",
      created_by: "",
    };
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send(newIssue)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
  });
  test("GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("_id");
        res.body[0].should.have.property("open");
        res.body[0].should.have.property("issue_title");
        res.body[0].should.have.property("issue_text");
        res.body[0].should.have.property("created_by");
        res.body[0].should.have.property("assigned_to");
        res.body[0].should.have.property("status_text");
        res.body[0].should.have.property("created_on");
        res.body[0].should.have.property("updated_on");
        assert.equal(res.body[0].open, true);
        done();
      });
  });

  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest?open=false")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.should.be.a("array");
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });

  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest?open=false")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.should.be.a("array");
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });
});
