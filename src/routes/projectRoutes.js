const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Project = mongoose.model('Project');

const router = express.Router();

router.use(requireAuth);

router.get('/projects', async (req, res) => {
    const projects = await Project.find({ userId: req.user._id });

    res.send(projects);
});

router.post('/projects', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and a description' });
  }

  try {
    const project = new Project({ name, description, userId: req.user._id });
    await project.save();
    res.send(project);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
