const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Agency = require('../../models/Agency');
const Branch = require('../../models/Branch');
const Contact = require('../../models/Contact');

router.get('/agencies', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let agencies = await Agency.find().sort({ agencyName: 1 });

    if (!agencies) {
      return res.status(400).json({ errors: [{ msg: 'There is no Agency' }] });
    }

    res.json(agencies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/contact/:subAgency', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let branch = await Branch.findById(req.params.subAgency);

    if (!branch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no such Branch' }] });
    }

    let contact = await Contact.find({ branch: branch.id });
    if (!contact) {
      return res.status(400).json({ errors: [{ msg: 'There is no Contact' }] });
    } else {
      res.json(contact);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/branches/:agency', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let company = await Agency.findById(req.params.agency);
    if (!company) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no such Agency' }] });
    }

    let branches = await Branch.find({ agency: company.id }).sort({
      branchName: 1
    });
    if (!branches) {
      return res.status(400).json({ errors: [{ msg: 'There is no Branch' }] });
    } else {
      res.json(branches);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/addContact',
  [
    [
      check('agency', 'Agency Name is required')
        .not()
        .isEmpty(),
      check('branch', 'Branch Name is required')
        .not()
        .isEmpty(),
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

    const agencyName = req.body.agency;
    const branchName = req.body.branch;
    try {
      let company = await Agency.findOne({ agencyName });
      if (!company) {
        company = new Agency({ agencyName });
        await company.save();

        let branch = new Branch({
          agency: company.id,
          agencyName: company.agencyName,
          branchName
        });
        await branch.save();

        const contact = new Contact({
          branch: branch.id,
          agencyName: branch.agencyName,
          branchName: branch.branchName,
          positionName: req.body.positionName,
          phone: req.body.phone,
          name: req.body.name,
          email: req.body.email
        });

        await contact.save();

        res.json(contact);
      } else {
        let branch = await Branch.findOne({ agency: company.id, branchName });
        if (!branch) {
          branch = new Branch({
            agency: company.id,
            agencyName: company.agencyName,
            branchName
          });
          await branch.save();

          const contact = new Contact({
            branch: branch.id,
            agencyName: branch.agencyName,
            branchName: branch.branchName,
            positionName: req.body.positionName,
            phone: req.body.phone,
            name: req.body.name,
            email: req.body.email
          });

          await contact.save();

          res.json(contact);
        } else {
          let contact = await Contact.findOne({
            branchName: branch.branchName,
            positionName: req.body.positionName,
            phone: req.body.phone
          });
          if (contact) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'This contact exists already' }] });
          } else {
            const contact = new Contact({
              branch: branch.id,
              agencyName: branch.agencyName,
              branchName: branch.branchName,
              positionName: req.body.positionName,
              phone: req.body.phone,
              name: req.body.name,
              email: req.body.email
            });

            await contact.save();

            res.json(contact);
          }
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
