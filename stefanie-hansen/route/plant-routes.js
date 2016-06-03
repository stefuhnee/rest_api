'use strict';

const express = require('express');
const router = express.Router();
const Plant = require('../model/plant');

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

  let findPlant = new Promise((resolve, reject) => {
    Plant.findOne({
      commonName: req.body.commonName,
      scientificName: req.body.scientificName
    }, (err, plant) => {
      if (err || plant) {
        next(new Error('Database error'));
        reject(new Error('Database error'));
      }
      resolve(plant);
    });
  });

  let savePlant = new Promise((resolve, reject) => {
    let newPlant = new Plant(req.body);
    newPlant.save((err, plant) => {
      if (err) {
        return reject(err);
      }
      resolve(plant);
    });
  });

// DON'T SAVE DUPLICATES

  if (!req.body) return res.sendStatus(400);
  findPlant.then((plant) => {
    return savePlant;
  }).then((plant) => {
    return res.json(plant);
  }).catch((err) => {
    console.log('error');
    return res.json(err);
  });
});
//
//
//   else {
//     Plant.findOne(
//       {
//         commonName: req.body.commonName,
//         scientificName: req.body.scientificName,
//       }, (err, plant) => {
//       if (err) return next(err);
//       else {
//         if (!plant) {
//           let newPlant = new Plant(req.body);
//           newPlant.save((err, data) => {
//             if (err) return next(err);
//             else return res.json(data);
//           });
//         } else {
//           return res.sendStatus(400);
//         }
//       }
//     });
//   }
// });

router.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Plant.findOneAndRemove({_id}, null, (err, data) => {
    if (err) return next(err);
    else {
      return res.send(`Deleted plant with ID of ${req.params.id}`);
    }
  });
});

router.use((err, req, res, next) => {
  res.status(400).send('Error');
  next(err);
});

module.exports = router;
