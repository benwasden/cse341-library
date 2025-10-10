const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Groups']
    try {
        const result = await mongodb.getDatabase().db().collection('groups').find();
        result.toArray().then((groups) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(groups);
    });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Groups']
    try {
        const groupId = new ObjectId(req.params.id);
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid group id to view.');
        }
        const result = await mongodb.getDatabase().db().collection('groups').find({ _id: groupId });
        result.toArray().then((groups) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(groups[0]);
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Some error occured while getting the group." });
    }
};

const createGroup = async (req, res) => {
    //#swagger.tags=['Groups']
    try {
        const group = {
            group_name: req.body.group_name,
            description: req.body.description,
            created_date: req.body.created_date,
            genre_focus: req.body.genre_focus,
            users: req.body.users,
            meeting_day: req.body.meeting_day,
            meeting_time: req.body.meeting_time
        };
        const response = await mongodb.getDatabase().db().collection('groups').insertOne(book);
        if (response.acknowledged) {
            res.status(204).send();
    }} catch (err) {
        res.status(500).json(response.error || 'Some error occured while adding the group.');
    };
};

const updateGroup = async (req, res) => {
    //#swagger.tags=['Groups']
    try {
        const groupId = new ObjectId(req.params.id);
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid group id to update a group.');
        }
        const group = {
            group_name: req.body.group_name,
            description: req.body.description,
            created_date: req.body.created_date,
            genre_focus: req.body.genre_focus,
            users: req.body.users,
            meeting_day: req.body.meeting_day,
            meeting_time: req.body.meeting_time
        };
        const response = await mongodb.getDatabase().db().collection('groups').replaceOne({ _id: groupId }, group);
        if (response.modifiedCount > 0) {
            res.status(204).send();
    }} catch (err) {
        res.status(500).json(response.error || 'Some error occured while updating the group.');
    };
};

const deleteGroup = async (req, res) => {
    //#swagger.tags=['Groups']
    try {
        const groupId = new ObjectId(req.params.id);
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid group id to delete a group.');
        }
        const response = await mongodb.getDatabase().db().collection('groups').deleteOne({ _id: groupId });
        if (response.deletedCount > 0) {
            res.status(204).send();
    }} catch (err) {
        res.status(500).json(response.error || 'Some error occured while deleting the group.');
    };
};

module.exports = { getAll, getSingle, createGroup, updateGroup, deleteGroup }