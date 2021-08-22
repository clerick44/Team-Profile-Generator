const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");

const employees = [];

const employeeQuestions = [
  {
    message: "Enter employee's name",
    name: "name",
    validate: (answer) => {
      if (!answer) {
        return console.log("Employee name is a required field!");
      }
      return true;
    },
  },
  {
    message: "Enter employee's id",
    name: "id",
    validate: (answer) => {
      if (!answer) {
        return console.log("Employee ID is a required field!");
      }
      return true;
    },
  },
  {
    message: "Enter employees email address",
    name: "email",
    validate: (answer) => {
      if (!answer) {
        return console.log("Employee email is a required field!");
      } else if (answer) {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!pattern.test(answer)) {
          return console.log(" is not a valid email address!");
        }
      }
      return true;
    },
  },
  {
    type: "list",
    message: "Select next employee's role",
    choices: ["None", "Engineer", "Intern", "Manager"],
    name: "role",
  },
];
const managerQuestions = Manager.question.concat(employeeQuestions);
console.log(managerQuestions);

function init() {
  addManager();
}

async function addManager() {
  try {
    const managerResponse = await inquirer.prompt(managerQuestions);
    console.log(managerResponse);
    const { name, id, email, officeNumber } = managerResponse;
    const newManager = new Manager(name, id, email, officeNumber);
    console.log(newManager);
  } catch (err) {
    console.log(err);
  }
}

init();
