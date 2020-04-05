const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const MRA = require('../../models/MRAContact');

router.get('/getMRAContacts', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let contacts = await MRA.find().sort({ positionName: 1 });

    if (!contacts) {
      return res.status(400).json({ errors: [{ msg: 'There is no agency' }] });
    }

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getOneMRAContact/:contactId', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let contact = await MRA.findById(req.params.contactId);

    if (!contact) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no such Position' }] });
    }
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/addMRAContact',
  [
    check('positionName', 'Designation field is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile Number is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile number must be atleast 10 characters').isLength({
      min: 10
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { positionName, phone, name, email } = req.body;
    try {
      let mra = await MRA.findOne({ phone });

      if (mra) {
        res
          .status(400)
          .json({ errors: [{ msg: 'This Contact Already Exists' }] });
      } else {
        mra = new MRA({ positionName, phone, name, email });
        await mra.save();
        res.json(mra);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
