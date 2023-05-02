const db = require('../config/connection');
const cTable = require('console.table');

// Role class
// Methods: returnRoleId, returnRoles, selectAll, addRole, deleteRole
// All methods are static
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


module.exports = Role;