import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:2500/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios.delete(`http://localhost:2500/delete/${id}`)
        .then((response) => {
          alert("User deleted successfully!");
          setUsers(users.filter(user => user._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          alert("Failed to delete user. Please check the server logs.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>Users</h2>
      </div>
      <hr />
      <div className="text-center mb-3">
        <button 
          className="btn btn-success" 
          onClick={() => navigate('/insert')}
        >
          Add User
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ width: "50px", textAlign: "center" }}>ID</th>
              <th scope="col" style={{ width: "150px", textAlign: "center" }}>Name</th>
              <th scope="col" style={{ width: "200px", textAlign: "center" }}>Email</th>
              <th scope="col" style={{ width: "150px", textAlign: "center" }}>Password</th>
              <th scope="col" style={{ width: "100px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{user.name}</td>
                  <td style={{ textAlign: "center" }}>{user.email}</td>
                  <td style={{ textAlign: "center" }}>{user.password}</td>
                  <td style={{ textAlign: "center" }}>
                    <button 
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Show;
