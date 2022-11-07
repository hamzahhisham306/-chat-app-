'use strict';

module.exports = (err,req, res, next) => {
  if (err) {
    res.status(404).send({
      code: 404,
      message: `Not Found`
    });
  } 
}