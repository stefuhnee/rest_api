'use strict';

const express = require('express');
const router = express.Router();
const Plant = require('../schema/plant');

router.all('/zones', (req, res, next) => {
  let minZone = 100;
  let maxZone = 0;
  Plant.find({}, (err, plants) => {
    if (err) return next(err);
    plants.forEach((plant) => {
      if (plant.zone < minZone) minZone = plant.zone;
      if (plant.zone > maxZone) maxZone = plant.zone;
    });
    res.send(`The range of zones represented in the database includes ${minZone} - ${maxZone}`);
  });
});

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
    return res.json({"Message":"Successfully updated"});
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
