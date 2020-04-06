const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.post(
  '/',
  [
    check('agency', 'Agency Name is required')
      .not()
      .isEmpty(),
    check('branch', 'Branch is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile number is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile number must be atleast 10 characters').isLength({
      min: 10
    }),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { agency, branch, phone, name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        agency,
        branch,
        phone,
        name,
        email,
        password,
        permission: 'request'
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
