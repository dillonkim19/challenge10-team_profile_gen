
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs

// initialize employees array
employees = []

// questions to ask everyone and specific role
generalQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of this employee?',
    },
    {
        type: 'input',
        name: 'id', 
        message: 'What is the id of this employee?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of this employee?',
    }
]

managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of this manager?',
    },
    {
        type: 'input',
        name: 'id', 
        message: 'What is the employee id of this manager?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of this manager?',
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of this manager?',
    }
]

engineerQuestions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is the github of this engineer?',
    }
]

internQuestions = [
    {
        type: 'input',
        name: 'school',
        message: 'What school is the intern attending?',
    }
]

const prompt = inquirer.createPromptModule();

function managerCard(manager) {
    return /*html*/`
    <div class="col-sm-3">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${manager.name}</h3>
            </div>
            <div class="card-body">
                <h4 class="card-text">${manager.getRole()}</h4>
                <p class="card-text">${manager.officeNumber}</p>
                <p class="card-text">${manager.id}</p>
                <p class="card-text">${manager.email}</p>
            </div>
        </div>
    </div>
    `
}

function engineerCard(engineer) {
    return /*html*/ `
    <div class="col-sm-3">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${engineer.name}</h3>
            </div>
            <div class="card-body">
                <h4 class="card-text">${engineer.getRole()}</h4>
                <p class="card-text">${engineer.github}</p>
                <p class="card-text">${engineer.id}</p>
                <p class="card-text">${engineer.email}</p>
            </div>
        </div>
    </div>
    `
}

function internCard(intern) {
    return /*html*/ `
    <div class="col-sm-3">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${intern.name}</h3>
            </div>
            <div class="card-body">
                <h4 class="card-text">${intern.getRole()}</h4>
                <p class="card-text">${intern.school}</p>
                <p class="card-text">${intern.id}</p>
                <p class="card-text">${intern.email}</p>
            </div>
        </div>
    </div>
    `
}

function generateHTML() {
    return /*html*/`
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TeamProfile</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Team Profile</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                ${employees.map((employee) => {
                    switch (employee.getRole()) {
                        case "Manager":
                            return managerCard(employee);
                        case "Engineer":
                            return engineerCard(employee);
                        case "Intern":
                            return internCard(employee);
                    }
                }).join("")}
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    </body>
    </html>
    `
}
// Note: .join('') after map function "removes" the commas that come after each array
//       this is because the map function returns an array that'll separate each element by a comma
function renderHTMLFile() {
    // figure out how to extract managers, engineers, interns into different arrays
    console.log(employees)

    fs.writeFileSync('./dist/index.html', generateHTML())


    // fs.writeFileSync('./dist/previous.html', /*html*/`
    //     <ul>
    //         ${employees.map(employee => /*html*/`
    //             <li>
    //                 <h1>${employee.getName()}</h1>
    //                 <h2>${employee.getRole()}</h2>
    //                 <p>${employee.id}</p>
    //                 <p>${employee.email}</p>
    //             </li>
    //         `).join('')}
    //     </ul>
    // `)
    // fs.appendFileSync('./dist/index.html', /*html*/`
    //     <ul>
    //         ${employees.map(employee => /*html*/`
    //             <li>
    //                 <h1>${employee.getName()}</h1>
    //                 <h2>${employee.getRole()}</h2>
    //                 <p>${employee.id}</p>
    //                 <p>${employee.email}</p>
    //             </li>
    //         `).join('')}
    //     </ul>
    // `)
}

function addEngineer() {
    prompt(generalQuestions)
    .then(({ name, id, email }) => {
        prompt(engineerQuestions)
        .then(( { github } ) => {
            employees.push(new Engineer(
                name,
                id, 
                email, 
                github,
            ))
            anotherEmployee();
        })
    })
    
}

function addIntern() {
    prompt(generalQuestions)
    .then(({ name, id, email }) => {
        prompt(internQuestions)
        .then(( { school } ) => {
            employees.push(new Intern(
                name, 
                id, 
                email,
                school,
            ))
            anotherEmployee();
        })
    })
}

function anotherEmployee() {
    prompt([
        {
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add another employee?',
            choices: [
                'Engineer',
                'Intern',
                'No',
            ]
        },
    ])
    .then(({ addEmployee }) => {
        switch(addEmployee) {
            case 'Engineer':
                addEngineer();
                break;
            
            case 'Intern':
                addIntern();
                break; 

            case 'No': 
                console.log('Creating HTML file for you :)')
                renderHTMLFile();
                break;
        }
    })
}

function newManager() {
    prompt(managerQuestions)
    .then( ({ name, id, email, officeNumber }) => {
        employees.push( new Manager(
            name, 
            id, 
            email,
            officeNumber,
        ))
        //console.log(employees)
        anotherEmployee();
    })


    // prompt(questions)
    // .then(({ name, position, id, email }) => {
    //     switch (position) {
    //         case 'Manager': 
    //         prompt(managerQuestions)
    //         .then(({ officeNumber }) => {
    //             employees.push(new Manager(
    //                 name,
    //                 id, 
    //                 email, 
    //                 officeNumber,
    //             ))
    //             anotherEmployee();
    //         })

    //         break;
            
    //         case 'Engineer': 
    //         prompt(engineerQuestions)
    //         .then(({ github }) => {
    //             employees.push(new Engineer(
    //                 name,
    //                 id,
    //                 email,
    //                 github,
    //             ))
    //         })
    //         break;
            
    //         case 'Intern': 

    //         break;
            
    //         default: 

    //     }
    // })

}

newManager();