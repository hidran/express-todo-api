const express = require('express');
const List = require('../models/List');
const router = express.Router();

router.get('/', (req,res)=> {
    res.send('<h1>It is working</h1>');
});
router.post('/', async (req,res) =>{
const {name} = req.body;
const userId = 1;
const listId = await List.create(name, userId);
res.json({id:listId, name});
});

module.exports = router;