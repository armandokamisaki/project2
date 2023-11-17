const validator = require('../helpers/validate');

const saveMember = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthday: 'required|string',
    baptismDate: 'required|string',
    address: 'required|string',
    city: 'required|string',
    state: 'required|string',
    email: 'required|email',
    phone: 'required|string'    
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
  saveMember
};