import React, { useState, useEffect } from 'react';
import AddSubmission from './components/AddSubmission';
import EditSubmission from './components/EditSubmission';
import SubmissionList from './components/SubmissionList';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  function handleAdd(newUser) {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => setUsers([...users, data]));
  }

  function handleUpdate(updatedUser) {
    fetch(`http://localhost:3000/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) =>
        setUsers(users.map((user) => (user.id === data.id ? data : user)))
      );

    setEditingUser(null);
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

  return (
    <div>
      <h1>Submission Form</h1>
      <AddSubmission onAdd={handleAdd} />
      <SubmissionList users={users} onEdit={handleEdit} />
      <EditSubmission selectedUser={editingUser} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;