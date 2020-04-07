const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

mongoose.set('useFindAndModify', false);

router.get('/customers', auth, async (req, res) => {
  try {
    let customers = await User.find({ permission: 'request' });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/users', auth, async (req, res) => {
  try {
    let users = await User.find({ permission: 'approve' });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:userId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findById(req.params.userId);

    if (!user)
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

router.get('/customer/:customerId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let customer = await User.findById(req.params.customerId);

    if (!customer)
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

router.get('/approveCustomer/:customerId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let customer = await User.findOneAndUpdate(
      { _id: req.params.customerId },
      { $set: { permission: 'approve' } },
      { new: true }
    );

    if (!customer)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer Profile not found' }] });

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer Profile not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

router.get('/rejectCustomer/:customerId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let customer = await User.findOneAndUpdate(
      { _id: req.params.customerId },
      { $set: { permission: 'reject' } },
      { new: true }
    );

    if (!customer)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer Profile not found' }] });

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer Profile not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:userId', auth, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.body.userId });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
