//Sets node dependencies
const fs = require("fs");
const inquirer = require("inquirer");

//Sets links to outside dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");

const StartHTML = require("./src/StartHTML");
const EndHTML = require("./src/EndHTML");
const ManagerHTML = require("./src/ManagerHTML");
const EngineerHTML = require("./src/EngineerHTML");
const InternHTML = require("./src/InternHTML");

//Questions used for all employee types
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
    message: "would you like to add another employee?",
    choices: ["Yes", "No"],
    name: "addMore",
  },
];

//Question unique to Manager position
const managerQuestions = [
  {
    message: "Enter Manager's office Number.",
    name: "officeNumber",
    validate: (answer) => {
      if (!answer) {
        return console.log("Office number is a required field!");
      }
      return true;
    },
  },
];

//Questions unique to Engineer and Intern positions
const teamMemberQuestions = [
  {
    type: "list",
    message: "Select employee's role",
    choices: ["Engineer", "Intern"],
    name: "role",
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
];

//Init calls all neccessary functions
async function init() {
  startHTML();
  await addManager();
  await addEmployee();
  finishHTML();
}

//function collects Manager data and builds HTML card
async function addManager() {
  try {
    const officeNumber = await inquirer.prompt(managerQuestions);
    const response = await inquirer.prompt(employeeQuestions);

    var { name, id, email, role, github, school, addMore } = response;

    employee = new Manager(name, id, email, officeNumber);

    newHTML = ManagerHTML(employee);
    addHTML(newHTML);
  } catch (err) {
    console.log(err);
  }
}

//function collects Intern/Engineer data and builds HTML card
async function addEmployee() {
  //continues to prompt for new employees as long as user input is "Yes"
  do {
    try {
      //prompts for user input
      const questionsResponse = await inquirer.prompt(teamMemberQuestions);
      const response = await inquirer.prompt(employeeQuestions);

      //stores response to variables
      var { name, id, email, addMore } = response;
      var { role, github, school } = questionsResponse;

      //checks employee type, creates employee class and builds HTML
      switch (role) {
        case "Engineer":
          employee = new Engineer(name, id, email, github);
          newHTML = EngineerHTML(employee);
          addHTML(newHTML);
          break;

        case "Intern":
          employee = new Intern(name, id, email, school);
          newHTML = InternHTML(employee);
          addHTML(newHTML);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  } while (addMore === "Yes");
}

//creates HTML file and builds boilerplate
function startHTML() {
  fs.writeFile("./dist/team.html", StartHTML, function (err) {
    if (err) {
      console.log(err);
    }
  });
  return;
}

//takes employee type and related data and creates HTML employee card and appends it to file
function addHTML(newHTML) {
  console.log("Adding employee to HTML file");
  fs.appendFile("./dist/team.html", newHTML, function (err) {
    if (err) {
      return reject(err);
    }
  });
  return;
}

//closes HTML
function finishHTML() {
  fs.appendFile("./dist/team.html", EndHTML, function (err) {
    if (err) {
      return reject(err);
    }
  });
  console.log("finished HTML");
}

init();
