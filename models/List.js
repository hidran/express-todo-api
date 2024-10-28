const db = require('../config/db');

const List = {
   async create(name, userId){
        const sql = 'INSERT INTO lists (name, user_id, created_at) VALUES (?, ?, NOW())';
        const [result] =  await db.execute(sql,
            [name, userId]
        );
        return result.insertId;
    },
    async remove(id, userId) {
        const sql = 'DELETE FROM lists where id=? and user_id=?';
        const [result] = await db.execute(sql,
            [id, userId]
        );
        return result.affectedRows;
    },
    async update({name,id, userId}) {
        const sql = 'UPDATE lists SET name=?, updated_at=NOW() where id=? and user_id=?';
        const [result] = await db.execute(sql,
            [name, id, userId]
        );
        return result.affectedRows;
    },
    async findAllByUserId(userId){
        const sql = 'SELECT * FROM lists WHERE user_id = ?';
        const [rows] = await db.query(sql,[userId]);
        return rows;
    } ,
    
    async getListById(id,userId){
        const sql = 'SELECT * FROM lists WHERE id=? AND user_id = ?';
        const [rows] = await db.query(sql, [id,userId]);
        return rows;
    } 

};
module.exports = List;