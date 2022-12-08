
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs

// initialize employees array
employees = []
managers = []
engineers = []
interns = []

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

// Note: .join('') after map function "removes" the commas that come after each array
//       this is because the map function returns an array that'll separate each element by a comma
function renderHTMLFile() {
    // figure out how to extract managers, engineers, interns into different arrays
    console.log(employees)

    for (let i = 0; i < employees.length; i++) {
        console.log(employees[i])
        console.log(employees[i].officeNumber == !undefined)
        console.log(employees[i].github == !undefined)
    }



    fs.writeFileSync('./dist/previous.html', /*html*/`
        <ul>
            ${employees.map(employee => /*html*/`
                <li>
                    <h1>${employee.getName()}</h1>
                    <h2>${employee.getRole()}</h2>
                    <p>${employee.id}</p>
                    <p>${employee.email}</p>
                </li>
            `).join('')}
        </ul>
    `)

    fs.writeFileSync('./dist/index.html', /*html*/`
        generateHTML(data)
    `)
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