const express = require('express');
const router = express.Router();

const Agency = require('../../models/Agency');
const Contact = require('../../models/Contact');

router.get('/contact/:agency', async (req, res) => {
  try {
    const company = await Agency.findOne({ name: req.params.agency });

    if (!company) {
      return res.status(400).json({ msg: 'There is no agency with this name' });
    }

    const contact = await Contact.find({ agency: company.id });
    if (!contact) {
      return res
        .status(400)
        .json({ msg: 'There is no contact details from this Agency' });
    } else {
      console.log(contact);
      res.json(contact);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/addContact', async (req, res) => {
  const name = req.body.agency;
  try {
    let company = await Agency.findOne({ name });

    if (!company) {
      company = {
        name
      };

      company = new Agency(company);

      await company.save();

      const contact = {
        agency: company.id,
        name: req.body.agency,
        positionName: req.body.positionName,
        phone: req.body.phone
      };

      const details = await new Contact(contact).save();

      res.json(details);
    } else {
      contact = {
        agency: company.id,
        name: req.body.agency,
        positionName: req.body.positionName,
        phone: req.body.phone
      };
      const details = await new Contact(contact).save();

      res.json(details);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
