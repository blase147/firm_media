import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchUsers } from '../../Redux/Reducers/authSlice'; // Import actions

const Roles = () => {
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const dispatch = useDispatch();

  // Get token and users from redux slice
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.auth.users);
  const isLoading = useSelector((state) => state.auth.isLoading); // Add loading state

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!token) {
          throw new Error('Authentication token is missing. Please log in again.');
        }

        // Dispatch action to fetch users
        dispatch(fetchUsers(token)); // Pass token to fetch users
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsers();
  }, [token, dispatch]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      if (!token) {
        throw new Error('Authentication token is missing. Please log in again.');
      }

      // Call API to update user role
      await axios.put(
        `http://localhost:5000/api/v1/users/${userId}`,
        { user: { role: newRole } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Dispatch an action to update the role in the Redux store
      dispatch(fetchUsers(token)); // Re-fetch users to reflect the updated role
    } catch (err) {
      console.error(err);
      setError('Failed to update role');
    }
  };

  // Ensure users.data is an array before filtering
  const filteredUsers = Array.isArray(users?.data)
    ? users.data.filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  if (isLoading) return <p>Loading users...</p>;
  if (error) {
    return (
      <p style={{ color: 'red' }}>
        Error:
        {' '}
        {error}
      </p>
    );
  }

  return (
    <div>
      <h2>User Role Management</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
