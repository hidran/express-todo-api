const Todo = require('../models/Todo');
const { successResponse, errorResponse } = require('../utils/responseHelper');

/**
 * Get all todos for a specific list.
 */
const getTodos = async (req, res) => {
    const { listId } = req.query;

    try {
        const todos = await Todo.findAllByListId(listId);
        successResponse(res, todos, 'Todos fetched successfully');
    } catch (error) {
        console.error('Error fetching todos:', error);
        errorResponse(res, 'Error fetching todos', 500, error);
    }
};

/**
 * Get a todo by ID.
 */
const getTodoById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.getTodoById(id);

        if (!todo.length) {
            return errorResponse(res, 'Todo not found', 404);
        }

        successResponse(res, todo[0], 'Todo fetched successfully');
    } catch (error) {
        console.error('Error fetching todo:', error);
        errorResponse(res, 'Error fetching todo', 500, error);
    }
};

/**
 * Create a new todo.
 */
const createTodo = async (req, res) => {
    const { name, listId, completed = false } = req.body;

    try {
        const todoId = await Todo.create({ name, listId, completed });
        successResponse(res, { id: todoId, name, listId, completed }, 'Todo created successfully');
    } catch (error) {
        console.error('Error creating todo:', error);
        errorResponse(res, 'Error creating todo', 500, error);
    }
};

/**
 * Update a todo by ID.
 */
const updateTodo = async (req, res) => {
    const { name, completed, listId } = req.body;
    const { id } = req.params;

    try {
        const affectedRows = await Todo.update({ name, completed, id, listId });

        if (affectedRows) {
            successResponse(res, { id, name, completed, listId }, 'Todo updated successfully');
        } else {
            errorResponse(res, 'Todo not found or update failed', 404);
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        errorResponse(res, 'Error updating todo', 500, error);
    }
};

/**
 * Delete a todo by ID.
 */
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await Todo.remove(id);

        if (affectedRows) {
            successResponse(res, null, 'Todo deleted successfully');
        } else {
            errorResponse(res, 'Todo not found or deletion failed', 404);
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        errorResponse(res, 'Error deleting todo', 500, error);
    }
};

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};
