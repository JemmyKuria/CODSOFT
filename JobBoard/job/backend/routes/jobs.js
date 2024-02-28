const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

router.post('/', async (req, res) => {
  const newJob = new Job({
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary,
  });

  const savedJob = await newJob.save();
  res.json(savedJob);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});

router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted successfully' });
});

router.patch('/:id', async (req, res) => {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
  
    res.json(updatedApplication);
  });