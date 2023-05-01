const inquirer = require('inquirer');
const Questions = require('./Questions');
const Operations = require('./Operations');

class CLI {
    
    // This is a static method, so it can be called without creating an instance of the class
    // This method prompts the user for input and then calls the appropriate method in the Operations class
    static promtUser() {
        return inquirer
        .prompt(Questions.generalQuestions)
        .then(async function(answers) {
            if(answers.action === 'View All Employees' || answers.action === 'View All Roles' || answers.action === 'View All Departments') 
                return await Operations.viewTables(answers.action);
            else {
                switch (answers.action) {
                    case 'Add Employee':
                        return inquirer
                        .prompt(Questions.addEmployeeQuestions)
                        .then(async function(answers) {
                            return await Operations.addEmployee(answers);
                        })
                    case 'Update Employee Role':
                        return inquirer
                        .prompt(Questions.updateEmployeeRoleQuestions)
                        .then(async function(answers) {
                            return await Operations.updateEmployeeRole(answers);
                        })
                    case 'Add Role':
                        return inquirer
                        .prompt(Questions.addRoleQuestions)
                        .then(async function(answers) {
                            return await Operations.addRole(answers);
                        })
                    case 'Add Department':
                        return inquirer
                        .prompt(Questions.addDepartmentQuestions)
                        .then(async function(answers) {
                            return await Operations.addDepartment(answers);
                        })
                    case 'Update employee manager':
                        return inquirer
                        .prompt(Questions.updateEmployeeManagerQuestions)
                        .then(async function(answers) {
                            return await Operations.updateEmployeeManager(answers);
                        })
                    case 'View employees by manager':
                        return inquirer
                        .prompt(Questions.viewEmployeesByManagerQuestions)
                        .then(async function(answers) {
                            return await Operations.viewEmployeesByManager(answers);
                        })
                    case 'View employees by department':
                        return inquirer
                        .prompt(Questions.viewEmployeesByDepartmentQuestions)
                        .then(async function(answers) {
                            return await Operations.viewEmployeesByDepartment(answers);
                        })
                    case 'Delete Employee':
                        return inquirer
                        .prompt(Questions.deleteEmployeeQuestions)
                        .then(async function(answers) {
                            return await Operations.deleteEmployee(answers);
                        })
                    case 'Delete Role':
                        return inquirer
                        .prompt(Questions.deleteRoleQuestions)
                        .then(async function(answers) {
                            return await Operations.deleteRole(answers);
                        })
                    case 'Delete Department':
                        return inquirer
                        .prompt(Questions.deleteDepartmentQuestions)
                        .then(async function(answers) {
                            return await Operations.deleteDepartment(answers);
                        })
                    case 'View the total budget of a department':
                        return inquirer
                        .prompt(Questions.budgetQuestions)
                        .then(async function(answers) {
                            return await Operations.viewDepartmentBudget(answers);
                        })
                    default:
                        console.log('Goodbye!');
                        process.exit();
                }
            }    
        })
        .then(() => {
            if(this.action !== 'Quit')
                this.promtUser();
            else        
                process.exit();
        })
        .catch((err) => {
            console.log(err);
            console.log('Oops. Something went wrong.');
        });
    }

}

module.exports = CLI;
