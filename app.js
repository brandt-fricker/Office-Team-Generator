const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

var render = require("./lib/htmlRenderer");

function outputTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}

const employeeConstructors = {
    Engineer: function(answers){
        return new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        )
    },
    Manager: function(answers){
        return new Manager (
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        )
    },
    Intern: function(answers){
        return new Intern (
            answers.name,
            answers.id,
            answers.email,
            answers.school
        )
    }
}

const employeeQuestions = {
    Engineer: [
        {
        type: "input",
        message: "What is your name? ",
        name: "name"
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email? ",
        name: "email"

    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github"

    }
    ],
    Manager: [
        {
            type: "input",
            message: "What is your name? ",
            name: "name"
        },
        {
            type: "input",
            message: "What is your ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email? ",
            name: "email"
    
        },
        {
            type: "input",
            message: "What is office phone number?",
            name: "officeNumber"
    
        }
    ],
    Intern: [
        {
            type: "input",
            message: "What is your name? ",
            name: "name"
        },
        {
            type: "input",
            message: "What is your ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email? ",
            name: "email"
    
        },
        {
            type: "input",
            message: "What school do you attend?",
            name: "school"
    
        }
    ],
      
   
};

const employees = [];

function init(){
    console.log("init")
    
        inquirer.prompt([{
            type: "list",
            message: "What is the role?",
            name: "employeeType",
            choices: [
                {
                    name: "Engineer",
                    value: "Engineer",
                    short: "Engineer"
                },
                {
                    name: "Manager",
                    value: "Manager",
                    short: "Manager"

                },
                {
                    name: "Intern",
                    value: "Intern",
                    short: "Intern"

                },
               

            ]
        }])
        .then(answer => {
            console.log(answer);
            inquirer.prompt(employeeQuestions[answer.employeeType])
            .then(answers => {
                const newEmployee = employeeConstructors[answer.employeeType](answers)
                employees.push(newEmployee);
                if(employees.length >= 1){

                    inquirer.prompt([{
                       type: "confirm",
                       message: "Do you have more staff to add?",
                       name: "addMore"
                    }]).then(answer => {
                      
                      
                      if(answer.addMore){
                          console.log("Adding more staff...")
                          init();
                      }else{
                          // need to render employees
                         
                         outputTeam()
                      }
                        
                    })
                }
                
               
            })

        })

    

}
init();



//What is your role
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
