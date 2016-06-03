'use strict';

const express = require('express');
const router = express.Router();
const Plant = require('../model/plant');

router.all('/zones', (req, res, next) => {
  let minZone = 100;
  let maxZone = 0;
  let promise = Plant.find({}).exec();

  promise.then((plants) => {

    plants.forEach((plant) => {
      if (plant.zone < minZone) minZone = plant.zone;
      if (plant.zone > maxZone) maxZone = plant.zone;
    });

    return res.send(`The range of zones represented in the database includes ${minZone} - ${maxZone}`);

  }).catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  let promise = Plant.find({}).exec();

  promise.then((plants) => res.json(plants))
    .catch((err) => next(err));
});

router.put('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  let _id = req.body._id;
  let promise = Plant.findOneAndUpdate({_id}, req.body).exec();

  promise.then(() => res.json({Message:'Successfully updated'}))
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  let newPlant = new Plant(req.body);
  // newPlant.save

  let findPromise = Plant.findOne({
    commonName: req.body.commonName,
    scientificName: req.body.scientificName
  }).exec();

  let savePromise = newPlant.save().exec();

  findPromise.then((plant) => {
    console.log('plant not found');
    if (plant) throw new Error('found plant');
    return savePromise;
  }).then((plant) => {
    console.log('plant saved');
    return res.json(plant);
  }).catch((err) => next(err));
});

//   let findPlant = new Promise((resolve, reject) => {
//     Plant.findOne({
//       commonName: req.body.commonName,
//       scientificName: req.body.scientificName
//     }, (err, plant) => {
//       console.log('error or plant', err || plant);
//       if (plant) {
//         next(new Error('Database error'));
//         return reject(new Error('Database error'));
//       }
//       resolve();
//     });
//   });
//
//   let savePlant = new Promise((resolve, reject) => {
//     let newPlant = new Plant(req.body);
//     newPlant.save((err, plant) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(plant);
//     });
//   });
//
// // DON'T SAVE DUPLICATES
//
//   if (!req.body) return res.sendStatus(400);
//   findPlant.then(() => {
//     return savePlant;
//   }).then((plant) => {
//     return res.json(plant);
//   }).catch((err) => {
//     console.log('error');
//     return res.json(err);
//   });
// });
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
  Plant.findOneAndRemove({_id}, null, (err) => {
    if (err) return next(err);
    else {
      return res.send(`Deleted plant with ID of ${req.params.id}`);
    }
  });
});

router.use((err, req, res, next) => {
  res.status(400).send('Error');
});

module.exports = router;
