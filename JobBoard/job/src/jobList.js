import React, { useState, useEffect } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await api.getJobs();
      setJobs(response.data);
    }
    fetchJobs();
  }, []);

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <Link to={`/jobs/${job.id}`}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
          </Link>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleApply(job.id);
          }}>
            <label htmlFor="resume">Resume:</label>
            <input type="file" name="resume" />
            <label htmlFor="coverLetter">Cover Letter:</label>
            <input type="file" name="coverLetter" />
            <button type="submit">Apply</button>
          </form>
        </li>
      ))}
    </ul>
  );
}

function handleApply(jobId) {
  // Handle job application logic here
  // For example, you could redirect the user to a job application form:
  const applicationData = new FormData();
  applicationData.append('firstName', 'John');
  applicationData.append('lastName', 'Doe');
  applicationData.append('email', 'john.doe@example.com');

  const fileInputResume = document.querySelector('input[type="file"][name="resume"]');
  const fileResume = fileInputResume.files[0];
  if (fileResume) {
    applicationData.append('resume', fileResume);
  }

  const fileInputCoverLetter = document.querySelector('input[type="file"][name="coverLetter"]');
  const fileCoverLetter = fileInputCoverLetter.files[0];
  if (fileCoverLetter) {
    applicationData.append('coverLetter', fileCoverLetter);
  }

  api.applyJob(jobId, applicationData)
    .then(response => {
      // Handle successful job application
      console.log('Job application successful:', response.data);
      // Redirect to a success page or display a success message
      alert('Job application successful!');
      // You could also redirect the user to a success page or a dashboard page here
    })
    .catch(error => {
      // Handle job application error
      console.error('Job application error:', error.response.data);
      // Display an error message
      alert('Job application failed. Please try again.');
    });
}

export default JobList;