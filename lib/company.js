const db = require('../config/connection');
const cTable = require('console.table');

class Employee {
    static async returnEmployees() {
        try {
            const [rows, fields] = await db.query('SELECT first_name, last_name FROM employee;');
            const result = rows.map(employee => `${employee.first_name} ${employee.last_name}`);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    static async returnEmployeeId(firstName, lastName) {
        try {
            const query = `SELECT id FROM employee WHERE first_name = '${firstName}' AND last_name = '${lastName}';`;
            const [rows, fields] = await db.query(query);
            return rows[0].id;
        } catch (err) {
            console.log(err);
        }
    }

    static async selectAll() {
        try {
            const [rows, fields] = await db.query('SELECT * FROM employee;');
            console.table(rows);  
        } catch (err) {
            return err;
        }
    }    

    static async addEmployee(firstName, lastName, roleId, managerId) {
        try{
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId});`;
            const [rows, fields] = await db.query(query);
            console.log('Employee added.');
        }
        catch (err) {
            console.log(err);
        }
    }

    static async updateEmployeeRole(employeeId, roleId) {
        try {
            const query = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`;
            const [rows, fields] = await db.query(query);
            console.log('Employee role updated.');
        } catch (err) {
            console.log(err);
        }
    }

    static async updateEmployeeManager(employeeId, managerId) {
        try {
            const query = `UPDATE employee SET manager_id = ${managerId} WHERE id = ${employeeId};`;
            const [rows, fields] = await db.query(query);
            console.log('Employee manager updated.');
        } catch (err) {
            console.log(err);
        }
    }

    static async selectEmployeesByManager(managerId) {
        try{
            const query = `SELECT first_name, last_name FROM employee WHERE manager_id = ${managerId};`;
            const [rows, fields] = await db.query(query);
            // const result = rows.map(employee => `${employee.first_name} ${employee.last_name}`);
            console.table(rows);
        } catch (err) {
            console.log(err);
        }
    }
    
    static async selectEmployeesByDepartment(departmentId) {
        try{
            const query = `SELECT first_name, last_name FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ${departmentId});`;
            const [rows, fields] = await db.query(query);
            // const result = rows.map(employee => `${employee.first_name} ${employee.last_name}`);
            console.table(rows);
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteEmployee(employeeId) {
        try {
            const query = `DELETE FROM employee WHERE id = ${employeeId};`;
            const [rows, fields] = await db.query(query);
            console.log('Employee deleted.');
        } catch (err) {
            console.log(err);
        }
    }
}

class Role {
    static async returnRoleId(title) {
        try {
            const query = `SELECT id FROM role WHERE title = '${title}';`;
            const [rows, fields] = await db.query(query);
            return rows[0].id;
        } catch (err) {
            console.log(err);
        }
    }

    static async returnRoles() {
        try {
            const [rows, fields] = await db.query('SELECT DISTINCT title FROM role;');
            return rows.map(role => role.title);
        } catch (err) {
            console.log(err);
        }
    }

    static async selectAll() {
        try {
            const [rows, fields] = await db.query('SELECT * FROM role;');
            console.table(rows);    
        } catch (err) {
            console.log(err);
        }
    }
    
    static async addRole(title, salary, departmentId) {
        try{
            const query = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId});`;
            const [rows, fields] = await db.query(query);
            console.log('Role added.');
        }
        catch (err) {
            console.log(err);
        }
    }

    static async deleteRole(roleId) {
        try {
            const query = `DELETE FROM role WHERE id = ${roleId};`;
            const [rows, fields] = await db.query(query);
            console.log('Role deleted.');
        } catch (err) {
            console.log(err);
        }
    }
    
}

class Department {
    static async returnDepartmentId(name) {
        try {
            const query = `SELECT id FROM department WHERE name = '${name}';`;
            const [rows, fields] = await db.query(query);
            return rows[0].id;
        } catch (err) {
            console.log(err);
        }
    }

    static async selectAll() {
        try {
            const [rows, fields] = await db.query('SELECT * FROM department;');
            console.table(rows);    
        } catch (err) {
            console.log(err);
        }
    }

    static async returnDepartments() {
        try {
            const [rows, fields] = await db.query('SELECT DISTINCT name FROM department;');
            return rows.map(department => department.name);    
        } catch (err) {
            console.log(err);
        }
    }

    static async addDepartment(name) {
        try{
            const query = `INSERT INTO department (name) VALUES ('${name}');`;
            const [rows, fields] = await db.query(query);
            console.log('Department added.');
        }
        catch (err) {
            console.log(err);
        }
    }

    static async deleteDepartment(departmentId) {
        try {
            const query = `DELETE FROM department WHERE id = ${departmentId};`;
            const [rows, fields] = await db.query(query);
            console.log('Department deleted.');
        } catch (err) {
            console.log(err);
        }
    }

    static async viewDepartmentBudget(departmentId) {
        try{
            const query = `SELECT SUM(salary) AS budget FROM role WHERE department_id = ${departmentId};`;
            const [rows, fields] = await db.query(query);
            console.log(rows[0].budget);
        } catch (err) {
            console.log(err);
        }
    }    

}

module.exports = {
    Employee,
    Role,
    Department
};
