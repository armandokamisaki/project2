const validator = require('../helpers/validate');

const saveFamilyTree = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    spouse: 'string',
    father: 'string',
    mother: 'string',
    children: 'string'        
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveFamilyTree
};