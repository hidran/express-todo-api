const db = require('../config/db');

const User = {
   async create(name, userId){
        const sql = 'INSERT INTO lists (name, user_id, created_at) VALUES (?, ?, NOW())';
        const [result] =  await db.execute(sql,
            [name, userId]
        );
        return result.insertId;
    },
    async remove(id) {

    },
    async findAllByUserId(userId){

    }

};
module.exports = User;