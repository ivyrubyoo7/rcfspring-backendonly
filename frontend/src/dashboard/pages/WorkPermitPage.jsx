import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import '../AdminDashboard.css';

const WorkPermitPage = () => {
  const [permits, setPermits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchPermits();
  }, []);

  const fetchPermits = async () => {
    try {
      const response = await API.get('/work-permits');
      setPermits(response.data);
    } catch (error) {
      console.error('Error fetching permits:', error);
      alert('Failed to fetch permits');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        employeeName: formData.employeeName,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate
      };

      console.log('SUBMIT PAYLOAD:', payload);

      await API.post('/work-permits', payload);

      alert('Work Permit submitted successfully');
      setShowForm(false);
      setFormData({ employeeName: '', description: '', startDate: '', endDate: '' });
      fetchPermits();

    } catch (error) {
      console.error('Submission error:', error.response || error);
      alert('Error: ' + (error.response?.data?.message || 'Check console'));
    }
  };

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1>Work Permits</h1>
        <p className="header-subtitle">Manage work permits for employees</p>
      </div>

      <div className="quick-actions">
        <button
          className="action-btn primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Submit Work Permit'}
        </button>
      </div>

      {showForm && (
        <div className="info-card">
          <h3>Submit New Work Permit</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Employee Name</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="action-btn success">Submit</button>
          </form>
        </div>
      )}

      <div className="info-card">
        <h3>All Permits</h3>
        <table className="permits-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {permits.map((permit) => (
              <tr key={permit.id}>
                <td>{permit.employeeName}</td>
                <td>{permit.description}</td>
                <td>{permit.startDate}</td>
                <td>{permit.endDate}</td>
                <td><span className="badge">{permit.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkPermitPage;

