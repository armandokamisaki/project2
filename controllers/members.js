const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('members').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid member id to find a member.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('members').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createMember = async (req, res) => {
  const member = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    baptismDate: req.body.baptismDate,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    email: req.body.email,
    phone: req.body.phone
  };
  const response = await mongodb.getDb().db().collection('members').insertOne(member);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the member.');
  }
};

const updateMember = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid member id to find a member.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const member = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    baptismDate: req.body.baptismDate,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    email: req.body.email,
    phone: req.body.phone
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('members')
    .replaceOne({ _id: userId }, member);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the member.');
  }
};

const deleteMember = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid member id to find a member.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('members').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the member.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createMember,
  updateMember,
  deleteMember
};