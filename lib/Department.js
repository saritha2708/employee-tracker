const db = require('../config/connection');
const cTable = require('console.table');

// Department class
// Methods: returnDepartmentId, returnDepartments, selectAll, addDepartment, deleteDepartment
// All methods are static
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


module.exports = Department;