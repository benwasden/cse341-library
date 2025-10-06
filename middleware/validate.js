const validator = require('../helpers/validate');

const saveBook = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "author_fname": "required|string",
        "author_lname": "required|string",
        "publish_date": "required|string",
        "isbn": "required|string",
        "version": "integer",
        "genre": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const saveComic = async (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "author_fname": "required|string",
        "author_lname": "required|string",
        "publish_date": "required|string",
        "genre": "required|string",
        "issue": "integer"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = { saveBook, saveComic }