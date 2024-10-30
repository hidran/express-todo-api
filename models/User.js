const db = require('../config/db');
const bcrypt = require('bcryptjs');
const User = {
    async create(name,email,password){
        $sql = 'INSERT INTO users(name, email, password, created_at) VALUES(?, ?, ?, NOW())';
        const hashedPassword = await bcrypt.hash(password,10);
        const [result] = await db.execute($sql, [name, email,hashedPassword]);
        return result.insertId;
    },
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
}
module.exports = User;