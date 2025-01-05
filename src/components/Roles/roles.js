import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Roles = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API with authentication
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token
      const response = await axios.get('http://localhost:5000/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // Debug response
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role updates for a user with authentication
  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token
      await axios.put(
        `http://localhost:5000/api/v1/users/${userId}`,
        { user: { role: newRole } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // eslint-disable-next-line max-len
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
    } catch (err) {
      console.error(err);
      setError('Failed to update role');
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) {
    return (
      <p style={{ color: 'red' }}>
        Error:
        {error}
      </p>
    );
  }

  return (
    <div>
      <h2>User Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users)
            && users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="editor">Editor</option>
                    <option value="guest">Guest</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
