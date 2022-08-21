const { request, response } = require('express');

const userGet = (req, res) => {
    const query = req.query;
    res.status(401).json();
};

const userPut = (req, res) => {
    const id = req.params.id;
    res.status(200).json();
};

const userPost = (req, res) => {
    const body = req.body;
    res.status(200).json();
};

const userDelete = (req, res) => {
    res.status(401).json();
};

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
};
