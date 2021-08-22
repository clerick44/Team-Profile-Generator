const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
}

const question = [
  {
    message: "Enter Manager's office Number.",
    name: "office",
    validate: (answer) => {
      if (!answer) {
        return console.log("Github username is a required field!");
      }
      return true;
    },
  },
];

module.exports = { Manager, question };
