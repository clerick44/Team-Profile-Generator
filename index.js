const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");

const employees = [];

let addMore = "Yes";
let isMgr = true;

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
    message: "Enter Manager's office Number.",
    name: "officeNumber",
    when: (isMgr) => isMgr,
    validate: (answer) => {
      console.log("inq " + isMgr);
      if (!answer) {
        return console.log("Office number is a required field!");
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
    message: "Select employee's role",
    choices: ["Engineer", "Intern"],
    name: "role",
    when: (isMgr) => !isMgr,
  },
  {
    message: "Enter Engineer's Github Id.",
    name: "github",
    when: (res) => res.role === "Engineer",
    validate: (answer) => {
      if (!answer) {
        return console.log("Github Id is a required field!");
      }
      return true;
    },
  },
  {
    message: "Enter Intern's school.",
    name: "school",
    when: (res) => res.role === "Intern",
    validate: (answer) => {
      if (!answer) {
        return console.log("School is a required field!");
      }
      return true;
    },
  },
  {
    type: "list",
    message: "would you like to add another employee?",
    choices: ["Yes", "No"],
    name: "addMore",
  },
];
// const managerQuestions = Manager.question.concat(employeeQuestions);

function init() {
  addEmployee();
}

//add employee
async function addEmployee() {
  try {
    while (addMore === "Yes") {
      const response = await inquirer.prompt(employeeQuestions);
      // console.log(response);

      const { name, id, email, role, github, school, addMore, officeNumber } =
        response;

      switch (role) {
        case "Engineer":
          console.log("engineer");
          employee = new Engineer(name, id, email, github);
          employees.push(employee);
          break;

        case "Intern":
          console.log("intern");
          employee = new Intern(name, id, email, school);
          employees.push(employee);
          break;

        default:
          console.log("manager");
          employee = new Manager(name, id, email, officeNumber);
          employees.push(employee);
          isMgr = false;
          break;
      }
      console.log(employees);
      console.log(addMore);
      console.log(isMgr);
    }
  } catch (err) {
    console.log(err);
  }
}

init();
