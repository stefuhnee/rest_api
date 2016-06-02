'use strict';

const express = require('express');
const router = express.Router();
const Supplement = require('../model/supplement');

router.get('/', (req, res, next) => {
  Supplement.find({}, (err, data) => {
    if (err) return next(err);
    else res.json(data);
  });
});

router.put('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  let _id = req.body._id;
  Supplement.findOneAndUpdate({_id}, req.body, (err, data) => {
    if (err) return next(err);
    return res.json({"Message":"Successfully updated"});
  });
});

router.post('/', (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  else {
    Supplement.findOne(
      {
        name: req.body.name,
        medicinalEffects: req.body.medicinalEffects,
        sideEffects: req.body.sideEffects,
      }, (err, supplement) => {
      if (err) return next(err);
      else {
        if (!supplement) {
          let newSupplement = new Supplement(req.body);
          newSupplement.save((err, data) => {
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
  Supplement.findOneAndRemove({_id}, null, (err, data) => {
    if (err) return next(err);
    else {
      return res.send(`Deleted supplement with ID of ${req.params.id}`);
    }
  });
});

module.exports = router;
