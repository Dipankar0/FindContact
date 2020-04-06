const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const MRA = require('../../models/MRAContact');
const MRAPosition = require('../../models/MRAPosition');

router.get('/getMRAPositions', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let positions = await MRAPosition.find().sort({ positionName: 1 });

    if (!positions) {
      return res.status(400).json({ errors: [{ msg: 'There is no agency' }] });
    }

    res.json(positions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getMRAContacts/:designationId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let contacts = await MRA.find({ positionId: req.params.designationId });

    if (!contacts) {
      return res.status(400).json({ errors: [{ msg: 'There is no Contact' }] });
    }
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/addMRAContact',
  [
    auth,
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
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { positionName, phone, name, email } = req.body;
    try {
      let mraPosition = await MRAPosition.findOne({ positionName });
      if (mraPosition) {
        let mra = await MRA.findOne({ positionId: mraPosition._id, phone });
        if (mra) {
          res
            .status(400)
            .json({ errors: [{ msg: 'This Contact Already Exists' }] });
        } else {
          mra = new MRA({
            positionId: mraPosition._id,
            positionName,
            phone,
            name,
            email
          });
          await mra.save();
          res.json(mra);
        }
      } else {
        mraPosition = new MRAPosition({
          positionName
        });
        await mraPosition.save();
        let mra = new MRA({
          positionId: mraPosition._id,
          positionName,
          phone,
          name,
          email
        });
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
