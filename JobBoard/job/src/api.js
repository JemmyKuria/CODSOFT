import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default {
  // Define your API endpoints here, for example:
  getJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (job) => api.post('/jobs', job),
  updateJob: (id, job) => api.put(`/jobs/${id}`, job),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyJob: (jobId, applicationData) => api.post(`/jobs/${jobId}/apply`, applicationData),
};