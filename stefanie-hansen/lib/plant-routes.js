'use strict';

const express = require('express');
const router = express.Router();
const Plant = require('../schema/plant');

router.get('/', (req, res, next) => {
  Plant.find({}, (err, data) => {
    if (err) return next(err);
    else res.json(data);
  });
});

router.put('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  let _id = req.body._id;
  Plant.findOneAndUpdate({_id}, req.body, (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
});

router.post('/', (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  else {
    Plant.findOne(
      {
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        medicinalUses: req.body.medicinalUses,
        zone: req.body.zone
      }, (err, plant) => {
      if (err) return next(err);
      else {
        if (!plant) {
          let newPlant = new Plant(req.body);
          newPlant.save((err, data) => {
            if (err) return next(err);
            else return res.json(data);
          });
        } else {
          return res.sendStatus(400);
        }
      }
    });
  }
});

router.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Plant.findOneAndRemove({_id}, null, (err, data) => {
    if (err) return next(err);
    else {
      return res.send(`Deleted plant with ID of ${req.params.id}`);
    }
  });
});

module.exports = router;
