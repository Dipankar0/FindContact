const express = require('express');
const router = express.Router();

const Agency = require('../../models/Agency');
const Branch = require('../../models/Branch');
const Contact = require('../../models/Contact');

router.get('/agencies', async (req, res) => {
  try {
    let agencies = await Agency.find().sort({ agencyName: 1 });

    if (!agencies) {
      return res.status(400).json({ msg: 'There is no agency' });
    }

    res.json(agencies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/contact/:subAgency', async (req, res) => {
  try {
    let branch = await Branch.findOne({ branchName: req.params.subAgency });

    if (!branch) {
      return res.status(400).json({ msg: 'There is no branch with this name' });
    }

    let contact = await Contact.find({ branch: branch.id });
    if (!contact) {
      return res
        .status(400)
        .json({ msg: 'There is no contact details from this Branch' });
    } else {
      res.json(contact);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/branches/:agency', async (req, res) => {
  try {
    let company = await Agency.findOne({ agencyName: req.params.agency });
    if (!company) {
      return res.status(400).json({ msg: 'There is no agency with this name' });
    }

    let branches = await Branch.find({ agency: company.id }).sort({
      branchName: 1
    });
    if (!branches) {
      return res
        .status(400)
        .json({ msg: 'There is no branch details from this Agency' });
    } else {
      res.json(branches);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/addContact', async (req, res) => {
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
        phone: req.body.phone
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
          phone: req.body.phone
        });

        await contact.save();

        res.json(contact);
      } else {
        const contact = new Contact({
          branch: branch.id,
          agencyName: branch.agencyName,
          branchName: branch.branchName,
          positionName: req.body.positionName,
          phone: req.body.phone
        });

        await contact.save();

        res.json(contact);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
