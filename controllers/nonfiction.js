const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['NonFiction']
    try {
        const result = await mongodb.getDatabase().db().collection('nonFiction').find();
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books);
    });
    } catch (err) {
        res.status(400).json({ message: err })
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['NonFiction']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid book id to see a book.');
        }
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('nonFiction').find({ _id: bookId });
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books[0]);
        });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const createBook = async (req, res) => {
    //#swagger.tags=['NonFiction']
    try {
        const book = {
            title: req.body.title,
            author_fname: req.body.author_fname,
            author_lname: req.body.author_lname,
            publish_date: req.body.publish_date,
            isbn: req.body.isbn,
            version: req.body.version,
            genre: req.body.genre
        };
        const response = await mongodb.getDatabase().db().collection('nonFiction').insertOne(book);
        if (response.acknowledged) {
            res.status(204).send();
    }} catch (err) {
        res.status(500).json(response.error || 'Some error occured while adding the book.');
    };
};

const updateBook = async (req, res) => {
    //#swagger.tags=['NonFiction']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid book id to update a book.');
        }
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author_fname: req.body.author_fname,
            author_lname: req.body.author_lname,
            publish_date: req.body.publish_date,
            isbn: req.body.isbn,
            version: req.body.version,
            genre: req.body.genre
        };
        const response = await mongodb.getDatabase().db().collection('nonFiction').replaceOne({ _id: bookId }, book);
        if (response.modifiedCount > 0) {
            res.status(204).send();
    }} catch (err) {
        res.status(500).json(response.error || 'Some error occured while updating the book.');
    };
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['NonFiction']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid book id to delete a book.');
        }
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('nonFiction').deleteOne({ _id: bookId });
        if (response.deletedCount > 0) {
            res.status(204).send();
    }} catch (err) {
        res.status(500).json(response.error || 'Some error occured while deleting the book');
    };
};

module.exports = { getAll, getSingle, createBook, updateBook, deleteBook }