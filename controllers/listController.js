const List = require('../models/List');


const getUserLists = async (req, res) => {
    const userId = 1;
    const lists = await List.findAllByUserId(userId);
    res.json({ data: lists });
};
const getListById = async (req, res) => {
    const userId = 1;
    const { id } = req.params;
    try {
        const list = await List.getListById(id, userId);
        res.json({ data: list });
    } catch (error) {
        console.log(error)
        res.send(error);
    }
};
const createList =async (req, res) => {
    const { name } = req.body;
    const userId = 1;
    const listId = await List.create(name, userId);
    res.json({ id: listId, name });
};
const updateList = async (req, res) => {
    const { name } = req.body;
    const userId = 1;
    const { id } = req.params;
    const listId = await List.update({ name, userId, id });
    res.json({ data: { id: listId, name }, message: "list updated" });
};
const deleteList = async (req, res) => {
    const { id } = req.params;
    const userId = 1;
    const listId = await List.remove(id, userId);
    res.json({ message: listId ? "List deleted" : "Error deleting list" });
};
module.exports = {
    deleteList, updateList, createList, getListById, getUserLists
};