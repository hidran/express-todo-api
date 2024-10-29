const List = require('../models/List');
const { successResponse, errorResponse } = require('../utils/responseHelper');

/**
 * Get all lists for a specific user.
 */
const getUserLists = async (req, res) => {
    const userId = 1; // Replace with req.user.id in a real app

    try {
        const lists = await List.findAllByUserId(userId);
        successResponse(res, lists, 'Lists fetched successfully');
    } catch (error) {
        console.error('Error fetching lists:', error);
        errorResponse(res, 'Error fetching lists', 500, error);
    }
};

/**
 * Get a list by ID.
 */
const getListById = async (req, res) => {
    const userId = 1;
    const { id } = req.params;

    try {
        const list = await List.getListById(id, userId);

        if (!list.length) {
            return errorResponse(res, 'List not found', 404);
        }

        successResponse(res, list[0], 'List fetched successfully');
    } catch (error) {
        console.error('Error fetching list:', error);
        errorResponse(res, 'Error fetching list', 500, error);
    }
};

/**
 * Create a new list.
 */
const createList = async (req, res) => {
    const { name } = req.body;
    const userId = 1;

    try {
        const listId = await List.create(name, userId);
        successResponse(res, { id: listId, name }, 'List created successfully');
    } catch (error) {
        console.error('Error creating list:', error);
        errorResponse(res, 'Error creating list', 500, error);
    }
};

/**
 * Update a list by ID.
 */
const updateList = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const userId = 1;

    try {
        const affectedRows = await List.update({ name, id, userId });

        if (affectedRows) {
            successResponse(res, { id, name }, 'List updated successfully');
        } else {
            errorResponse(res, 'List not found or update failed', 404);
        }
    } catch (error) {
        console.error('Error updating list:', error);
        errorResponse(res, 'Error updating list', 500, error);
    }
};

/**
 * Delete a list by ID.
 */
const deleteList = async (req, res) => {
    const { id } = req.params;
    const userId = 1;

    try {
        const affectedRows = await List.remove(id, userId);

        if (affectedRows) {
            successResponse(res, null, 'List deleted successfully');
        } else {
            errorResponse(res, 'List not found or deletion failed', 404);
        }
    } catch (error) {
        console.error('Error deleting list:', error);
        errorResponse(res, 'Error deleting list', 500, error);
    }
};

module.exports = {
    getUserLists,
    getListById,
    createList,
    updateList,
    deleteList,
};
