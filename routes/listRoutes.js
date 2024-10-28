const express = require('express');
const List = require('../models/List');
const router = express.Router();
const { deleteList, updateList, createList, getListById, getUserLists } = require ('../controllers/listController');

router.get('/', getUserLists);
router.get('/:id', getListById);
router.post('/', createList);
router.patch('/:id', updateList);
router.delete('/:id', deleteList);

module.exports = router;