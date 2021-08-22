const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getRole() {
    return "Engineer";
  }
  getGitHub() {
    return this.github;
  }
}

const engineerQuestion = [
  {
    message: "Enter employee's Github username.",
    name: "github",
    validate: (answer) => {
      if (!answer) {
        return console.log("Github username is a required field!");
      }
      return true;
    },
  },
];

module.exports = { Engineer, engineerQuestion };
