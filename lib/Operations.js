const Employee = require('./Employee');
const Role = require('./Role');
const Department = require('./Department');

// This class contains static methods that are called from cli.js
class Operations {
    static async viewTables(action) {
        switch (action) {
            case 'View All Employees':
                return await Employee.selectAll();
    
            case 'View All Roles':
                return await Role.selectAll(); 
         
            case 'View All Departments':
                return await Department.selectAll();
            
            default:
                console.log('Goodbye!');
                process.exit();
        }        
    }

    static async addEmployee(answers) {
        const { firstName, lastName, role, manager } = answers;
        const roleId = await Role.returnRoleId(role);
        if(manager === 'None')
            return await Employee.addEmployee(firstName, lastName, roleId, null);
        const arr = manager.split(' ');
        const managerId = await Employee.returnEmployeeId(arr[0], arr[1]);
        return await Employee.addEmployee(firstName, lastName, roleId, managerId)
    }

    static async updateEmployeeRole(answers) {
        const { employee, role } = answers;
        const arr = employee.split(' ');
        const employeeId = await Employee.returnEmployeeId(arr[0], arr[1]);
        const roleId = await Role.returnRoleId(role);
        return await Employee.updateEmployeeRole(employeeId, roleId);
    }

    static async addRole(answers) {
        const { title, salary, department} = answers;
        const departmentId = await Department.returnDepartmentId(department);
        return await Role.addRole(title, salary, departmentId);
    }

    static async addDepartment(answers) {
        const { name } = answers;
        return await Department.addDepartment(name);
    }

    static async updateEmployeeManager(answers) {
        const { employee, manager } = answers;
        const arr = employee.split(' ');
        const employeeId = await Employee.returnEmployeeId(arr[0], arr[1]);
        if(manager === 'None')
            return await Employee.updateEmployeeManager(employeeId, null);
        const arr2 = manager.split(' ');
        const managerId = await Employee.returnEmployeeId(arr2[0], arr2[1]);
        return await Employee.updateEmployeeManager(employeeId, managerId);
    }

    static async deleteEmployee(answers) {
        const { employee } = answers;
        const arr = employee.split(' ');
        const employeeId = await Employee.returnEmployeeId(arr[0], arr[1]);
        return await Employee.deleteEmployee(employeeId);
    }

    static async deleteRole(answers) {
        const { role } = answers;
        const roleId = await Role.returnRoleId(role);
        return await Role.deleteRole(roleId);
    }

    static async deleteDepartment(answers) {
        const { department } = answers;
        const departmentId = await Department.returnDepartmentId(department);
        return await Department.deleteDepartment(departmentId);
    }

    static async viewEmployeesByManager(answers) {
        const { manager } = answers;
        const arr = manager.split(' ');
        const managerId = await Employee.returnEmployeeId(arr[0], arr[1]);
        return await Employee.selectEmployeesByManager(managerId);
    }

    static async viewEmployeesByDepartment(answers) {
        const { department } = answers;
        const departmentId = await Department.returnDepartmentId(department);
        return await Employee.selectEmployeesByDepartment(departmentId);
    }

    static async viewDepartmentBudget(answers) {
        const { department } = answers;
        const departmentId = await Department.returnDepartmentId(department);
        return await Department.viewDepartmentBudget(departmentId);
    }

}




module.exports = Operations;
