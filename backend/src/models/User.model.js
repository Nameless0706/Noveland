const db = require('../databases/Mysql');


const User = {

    getAllUsers: async () => {
       const query = `SELECT * FROM user`;
       const [rows] = await db.query(query);
       return rows; 
    },

    getUserByUsername: async (username) => {
        const query = `SELECT * FROM user WHERE username = ? `;
        const [rows] = await db.query(query, [username]);
        return rows[0];
    },

    createUser: async (username, firstname, lastname, dob, createdAt, password, email) => {
        const query = `INSERT INTO user (username, firstname, lastname, 
                                    date_of_birth, created_at, password, email)
                   VALUES(?,?,?,?,?,?,?)`;
        const result = await db.query(query, [username, firstname, lastname, dob, createdAt, password, email]);
        return result.insertId;
    },

    updateUser: async (username, firstname, lastname, dob, email) => {
        const query = `UPDATE user SET firstname = ?, lastname = ?, date_of_birth = ?, email = ?
                        WHERE username = ? `;
        const result = await db.query(query, [firstname, lastname, dob, email, username]);
        return result.affectedRows;
    },

    deleteUser: async (username) => {
        const query = `DELETE FROM user WHERE username = ? `
        const [result] = await db.query(query, [username]);
        return result.affectedRows;
    }
}



module.exports = User;