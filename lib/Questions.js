const Employee = require('./Employee');
const Role = require('./Role');
const Department = require('./Department');

// Questions for the user to answer
// Each question is an array object with appropriate properties
// All questions are static fields of the Questions class
class Questions {
    
        static generalQuestions = [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Update employee manager',
                    'View employees by manager',
                    'View employees by department',
                    'Delete Employee',
                    'Delete Role',
                    'Delete Department',
                    'View the total budget of a department',
                    'Quit',
                ],
            }
        ];

        static addEmployeeQuestions = [
            {
                type: 'input',  
                message: 'What is the employee\'s first name?',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'lastName',
            },
            {
                type: 'list',
                message: 'What is the employee\'s role?',
                name: 'role',
                choices: async function(answers){
                    return await Role.returnRoles();
                }
            },
            {
                type: 'list',
                message: 'Who is the employee\'s manager?',
                name: 'manager',
                choices: async function(answers){
                    const arr = await Employee.returnEmployees();
                    arr.push('None');
                    return arr;
                }
            },
        ];

        static addRoleQuestions = [
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'What is the department of the role?',
                name: 'department',
                choices: async function(answers){
                    return await Department.returnDepartments();
                }
            },
        ];

        static addDepartmentQuestions = [
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'name',
            },
        ];

        static updateEmployeeRoleQuestions = [
            {
                type: 'list',
                message: 'Which employee\'s role you would like to update?',
                name: 'employee',
                choices: async function(answers){
                    return await Employee.returnEmployees();
                }
            },
            {
                type: 'list',
                message: 'What is the employee\'s new role?',
                name: 'role',
                choices: async function(answers){
                    return await Role.returnRoles();
                }
            },
        ];

        static updateEmployeeManagerQuestions = [
            {
                type: 'list',
                message: 'Which employee\'s manager you would like to update?', 
                name: 'employee',
                choices: async function(answers){
                    return await Employee.returnEmployees();
                }
            },
            {
                type: 'list',
                message: 'Who is the employee\'s new manager?',
                name: 'manager',
                choices: async function(answers){
                    const arr = await Employee.returnEmployees();
                    arr.push('None');
                    return arr;
                }
            },
        ];

        static viewEmployeesByManagerQuestions = [
            {
                type: 'list',
                message: 'Which manager\'s employees you would like to view?',
                name: 'manager',
                choices: async function(answers){
                    return await Employee.returnEmployees();
                }
            },
        ];

        static viewEmployeesByDepartmentQuestions = [
            {
                type: 'list',
                message: 'Which department\'s employees you would like to view?',
                name: 'department',
                choices: async function(answers){
                    return await Department.returnDepartments();
                }
            },
        ];

        static deleteEmployeeQuestions = [
            {
                type: 'list',
                message: 'Which employee you would like to delete?',
                name: 'employee',
                choices: async function(answers){
                    return await Employee.returnEmployees();
                }
            },
        ];

        static deleteRoleQuestions = [
            {
                type: 'list',
                message: 'Which role you would like to delete?',
                name: 'role',
                choices: async function(answers){
                    return await Role.returnRoles();
                }
            },
        ];

        static deleteDepartmentQuestions = [
            {
                type: 'list',
                message: 'Which department you would like to delete?',
                name: 'department',
                choices: async function(answers){
                    return await Department.returnDepartments();
                }
            },
        ];

        static budgetQuestions = [
            {
                type: 'list',
                message: 'Which department\'s budget you would like to view?',
                name: 'department',
                choices: async function(answers){
                    return await Department.returnDepartments();
                }
            },
        ];
    
}


module.exports = Questions;