const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get ('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:id', async (req, res) => {
const user = await User.findById(req.params.id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const {identificacion, nombre, cargo} = req.body;
  const user = new User({ identificacion, nombre, cargo});
  await user.save();
  res.json({status: 'usuario guardado'});
});

router.put('/:id', async (req, res) => {
  const {identificacion, nombre, cargo} = req.body;
  const newUser = {identificacion, nombre, cargo};
  await User.findByIdAndUpdate(req.params.id, newUser);
  res.json({status: 'usuario actualizado'});
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({status: 'usuario eliminado'});
})


module.exports = router;