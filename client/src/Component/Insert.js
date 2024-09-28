import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Insert = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleInsert = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    console.log("Submitting: ", { name, email, password });

    axios.post('http://localhost:2500/add', { name, email, password })
      .then((response) => {
        console.log(response.data);
        alert("User inserted successfully!");

        setName('');
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        console.error("Error occurred while inserting: ", err);
        alert("Failed to insert user. Please check the server logs.");
      });
  };

  return (
    <div className="container mt-5">
      {/* Form */}
      <form
        onSubmit={handleInsert}
        style={{ width: "30rem", margin: "auto", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", border: "1px solid black" }}
      >
        <h3 className="text-center mb-4">Insert User Details</h3>

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

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success">
            Insert User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Insert;
