const fs = require("fs");
const inquirer = require("inquirer");

// const  = require("./src/generateHTML");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");

const StartHTML = require("./src/StartHTML");
const EndHTML = require("./src/EndHTML");
const ManagerHTML = require("./src/ManagerHTML");
const EngineerHTML = require("./src/EngineerHTML");
const InternHTML = require("./src/InternHTML");

const employees = [];
var newHTML;

var isMgr = true;

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
    when: (isMgr) => {
      // console.log(isMgr);
      return isMgr !== true;
    },
    validate: (answer) => {
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
    when: !isMgr,
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

async function init() {
  startHTML();
  await addEmployee();
  finishHTML();
}

//add employee
async function addEmployee() {
  do {
    console.log("asking");
    try {
      const response = await inquirer.prompt(employeeQuestions);

      var { name, id, email, role, github, school, addMore, officeNumber } =
        response;

      switch (role) {
        case "Engineer":
          console.log("engineer");
          employee = new Engineer(name, id, email, github);
          newHTML = EngineerHTML(employee);
          addHTML(newHTML);
          employees.push(employee);
          break;

        case "Intern":
          console.log("intern");
          employee = new Intern(name, id, email, school);
          newHTML = InternHTML(employee);
          addHTML(newHTML);
          employees.push(employee);
          break;

        default:
          console.log("manager");
          employee = new Manager(name, id, email, officeNumber);
          newHTML = ManagerHTML(employee);
          addHTML(newHTML);
          employees.push(employee);
          // isMgr = false;
          break;
      }
    } catch (err) {
      console.log(err);
    }
    isMgr = false;
    console.log("isMgr is now = " + isMgr);
  } while (addMore === "Yes");
}

function startHTML() {
  fs.writeFile("./dist/team.html", StartHTML, function (err) {
    if (err) {
      console.log(err);
    }
  });
  return;
}

function addHTML(newHTML) {
  console.log("appending file");
  fs.appendFile("./dist/team.html", newHTML, function (err) {
    if (err) {
      return reject(err);
    }
  });
  return;
}

function finishHTML() {
  console.log("appending file");
  fs.appendFile("./dist/team.html", EndHTML, function (err) {
    if (err) {
      return reject(err);
    }
  });
  console.log("finished HTML");
}

init();
