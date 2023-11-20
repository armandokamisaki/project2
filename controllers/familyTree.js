const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('familyTree').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error); 
    res.status(500).json(response.error || 'Error trying to get all family trees .');
}
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a family tree.');
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('familyTree').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    console.log(error); 
    res.status(500).json(response.error || 'Error trying to get family tree.');
}
};

const createFamilyTree = async (req, res) => {
  const familyTree = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    spouse: req.body.spouse,
    father: req.body.father,
    mother: req.body.mother,
    children: req.body.children    
  };
  const response = await mongodb.getDb().db().collection('familyTree').insertOne(familyTree);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the family tree.');
  }
};

const updateFamilyTree = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a family tree.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const familyTree = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    spouse: req.body.spouse,
    father: req.body.father,
    mother: req.body.mother,
    children: req.body.children
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('familyTree')
    .replaceOne({ _id: userId }, familyTree);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the family tree.');
  }
};

const deleteFamilyTree = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a family tree.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('familyTree').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the family tree.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createFamilyTree,
  updateFamilyTree,
  deleteFamilyTree
};