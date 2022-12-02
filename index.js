
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs

employees = []

questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of this employee?',
    },
    {
        type: 'list',
        name: 'position',
        message: 'What position is this employee?',
        choices: [
            'Manager', 
            'Engineer',
            'Intern'
        ]
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
        name: 'officeNumber',
        message: 'What is the office number of this manager?',
    }
]

const prompt = inquirer.createPromptModule();

function renderHTMLFile() {
    fs.writeFileSync('./dist/index.html', /*html*/`
        <ul>
            ${employees.map(employee => /*html*/`
                <li>${employee.getName()}</li>
            `)}
            
        </ul>
    `)
}

function anotherEmployee() {
    prompt([
        {
            type: 'confirm',
            name: 'moreEmployee',
            message: 'Create another employee?'
        }
    ])
    .then(({ moreEmployee }) => {
        if (moreEmployee) newEmployee()
        else renderHTMLFile()
    })
}

function newEmployee() {
    prompt(questions)
    .then(({ name, position, id, email }) => {
        switch (position) {
            case 'Manager': 
            prompt(managerQuestions)
            .then(({ officeNumber }) => {
                employees.push(new Manager(
                    name,
                    id, 
                    email, 
                    officeNumber,
                ))
                anotherEmployee();
            })

            break;
            
            case 'Engineer': 

            break;
            
            case 'Intern': 

            break;
            
            default: 

        }
    })

}

newEmployee();