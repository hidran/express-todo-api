const db = require('../config/db');

const Todo = {
   async create({name, listId,completed=false}){
        const sql = 'INSERT INTO todos (name, list_id,completed, created_at) VALUES (?,?, ?, NOW())';
        const [result] =  await db.execute(sql,
            [name, listId, completed]
        );
        return result.insertId;
    },
    async remove(id) {
        const sql = 'DELETE FROM todos where id=?';
        const [result] = await db.execute(sql, [id]
        );
        return result.affectedRows;
    },
    async update({name,completed,id, listId}) {
        const sql = 'UPDATE todos SET name=?,completed=?,list_id=?, updated_at=NOW() where id=?';
        const [result] = await db.execute(sql,
            [name, completed, listId, id ]
        );
        console.log(result);
        return result.affectedRows;
    },
    async findAllByListId(listId){
        const sql = 'SELECT * FROM todos WHERE list_id = ?';
        const [rows] = await db.query(sql, [listId]);
        return rows;
    } ,
    
    async getTodoById(id){
        const sql = 'SELECT * FROM todos WHERE id=?';
        const [rows] = await db.query(sql, [id]);
        return rows;
    } 

};
module.exports = Todo;