"use strict";

const { Post } = require("../modules/index");

module.exports = async (req, res, next) => {
  let { id } = req.params;

  const checkPost = await Post.read(id);
  if (!checkPost) {
    res.status(500).send({
      code: 500,
      message:`Post ${ req.params.id } not found`,
    });
} else next();
};