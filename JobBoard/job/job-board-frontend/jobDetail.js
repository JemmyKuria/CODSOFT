import React, { useState, useEffect } from 'react';
import api from './api';

function JobDetail({ match }) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      const response = await api.getJobById(match.params.id);
      setJob(response.data);
    }
    fetchJob();
  }, [match.params.id]);

  return (
    <div>
      {job ? (
        <div>
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          <p>Company: {job.company}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Posted At: {new Date(job.postedAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default JobDetail;