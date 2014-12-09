var commit, lorax;

lorax = require("../index");

commit = "7e7ac8957953e1686113f8086dc5b67246e5d3fa\nfeature(lorax): Basic testing\n\nFixes #123";

exports.parseCommitTest = {
  "hash parse": function(test) {
    var obj;
    obj = lorax.parseCommit(commit);
    test.equal(obj.hash, "7e7ac8957953e1686113f8086dc5b67246e5d3fa");
    test.done();
  },
  "type parse": function(test) {
    var obj;
    obj = lorax.parseCommit(commit);
    test.equal(obj.type, "feature");
    test.done();
  },
  "component parse": function(test) {
    var obj;
    obj = lorax.parseCommit(commit);
    test.equal(obj.component, "lorax");
    test.done();
  },
  "component special character parse": function(test) {
    var obj, specialCommit;
    specialCommit = "7e7ac8957953e1686113f8086dc5b67246e5d3fa\nfeature(lorax-test!): Basic testing";
    obj = lorax.parseCommit(specialCommit);
    test.equal(obj.component, "lorax-test!");
    test.done();
  },
  "message parse": function(test) {
    var obj;
    obj = lorax.parseCommit(commit);
    test.equal(obj.message, "Basic testing");
    test.done();
  },
  "title parse": function(test) {
    var obj;
    obj = lorax.parseCommit(commit);
    test.equal(obj.title, "feature(lorax): Basic testing");
    test.done();
  },
  "issue parse": function(test) {
    var obj;
    obj = lorax.parseCommit(commit);
    test.equal(obj.issues[0], "123");
    test.done();
  },
  "issues parse": function(test) {
    var issuesCommit, obj;
    issuesCommit = "7e7ac8957953e1686113f8086dc5b67246e5d3fa\nfeature(lorax): Basic testing\n\nFixes #123\nFixes #124";
    test.expect(2);
    obj = lorax.parseCommit(issuesCommit);
    test.equal(obj.issues[0], 123);
    test.equal(obj.issues[1], 124);
    test.done();
  },
  "breaking change parse": function(test) {
    var breakingCommit, obj;
    breakingCommit = "7e7ac8957953e1686113f8086dc5b67246e5d3fa\nfeature(lorax): Basic testing\n\nBREAKING CHANGE: Testing";
    test.expect(2);
    obj = lorax.parseCommit(breakingCommit);
    test.equal(obj.type, "breaking");
    test.equal(obj.message, " Testing");
    test.done();
  },
  "long message parse": function(test) {
    var longMessage, obj;
    longMessage = "7e7ac8957953e1686113f8086dc5b67246e5d3fa\nfeature(lorax): Basic testing\n";
    longMessage += "Additional features:\n";
    longMessage += "-foo\n";
    longMessage += "-bar";
    test.expect(1);
    
    obj = lorax.parseCommit(longMessage);
    test.equal(obj.message, "Basic testing\nAdditional features:\n-foo\n-bar");
    
    test.done();
  },
  "code example in commit parse": function(test) {
    var codeMessage, obj;
    
    codeMessage = "7e7ac8957953e1686113f8086dc5b67246e5d3fa\nfeature(lorax): Basic testing\n";
    codeMessage += "Example:\n";
    codeMessage += "```\n";
    codeMessage += "var test='hello';\n";
    codeMessage += "test = test.replace('ll', 'r');\n";
    codeMessage += "console.log(test);\n";
    codeMessage += "```\n";
    test.expect(1);
    
    obj = lorax.parseCommit(codeMessage);
    test.equal(obj.message, "Basic testing\nExample:\n```\nvar test='hello';\ntest = test.replace('ll', 'r');\nconsole.log(test);\n```\n");
    
    test.done();
  }
};
