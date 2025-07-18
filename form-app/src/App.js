import React, { useEffect, useState } from 'react';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [editId, setEditId] = useState(null);

  const API_URL = 'http://localhost:5000/submissions';


  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setSubmissions(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {

      fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
        .then(res => res.json())
        .then(updated => {
          setSubmissions(submissions.map(item => item.id === editId ? updated : item));
          setEditId(null);
          setForm({ name: '', email: '', message: '' });
        });
    } else {
    
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
        .then(res => res.json())
        .then(newItem => {
          setSubmissions([...submissions, newItem]);
          setForm({ name: '', email: '', message: '' });
        });
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, email: item.email, message: item.message });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submission Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        /><br /><br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br /><br />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        /><br /><br />
        <button type="submit">{editId ? 'Update' : 'Submit'}</button>
      </form>

      <h3>Submissions:</h3>
      <ul>
        {submissions.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> ({item.email}): {item.message}
            <button onClick={() => handleEdit(item)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;