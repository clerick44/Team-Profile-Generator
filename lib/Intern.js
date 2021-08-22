const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getRole() {
    return "Intern";
  }
  getSchool() {
    return this.school;
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

module.exports = Intern;
