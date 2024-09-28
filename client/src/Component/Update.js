import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:2500/getuser/${id}`)
      .then((response) => {
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        alert("Failed to load user data.");
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    axios.put(`http://localhost:2500/updateUser/${id}`, { name, email, password })
      .then((response) => {
        console.log("User updated successfully:", response.data);
        alert("User updated successfully!");
        navigate('/');
      })
      .catch((err) => {
        console.error("Error updating user data:", err);
        alert("Failed to update user.");
      });
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleUpdate}
        style={{ width: "30rem", margin: "auto", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", border: "1px solid black" }}
      >
        <h3 className="text-center mb-4">Edit User Details</h3>

        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Update User
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
