const Todo = require('../models/Todo');


const getTodos = async (req, res) => {
    const { listId } = req.body;
    const todos = await Todo.findAllByListId(listId);
    res.json({ data: todos });
};
const getTodoById = async (req, res) => {
    
    const { id } = req.params;
    try {
        const todo = await Todo.getTodoById(id);
        res.json({ data: todo });
    } catch (error) {
        console.log(error)
        res.send(error);
    }
};
const createTodo =async (req, res) => {   
    const todo = await Todo.create(req.body);
    res.json({ id: todo });
};
const updateTodo = async (req, res) => {
    const { name,completed,listId } = req.body;

    const { id } = req.params;
    const affectedRows = await Todo.update({ name, completed, id, listId });
    res.json({ data: { id, completed, name,listId }, message: affectedRows?"Todo updated":"Problem updating todo" });
};
const deleteTodo = async (req, res) => {
    const { id } = req.params;
   
    const affectedRows = await Todo.remove(id, userId);
    res.json({ message: affectedRows ? "Todo deleted" : "Error deleting todo" });
};
module.exports = {
    deleteTodo, updateTodo, createTodo, getTodoById, getTodos
};