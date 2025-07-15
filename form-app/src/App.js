import { useState } from "react";
import subList from "./components/NoteList";
import addSub from "./components/AddNote";
import editSub from "./components/EditNote";

const App = () => {
  const [editingSub, setEditingSub] = useState(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Form App</h1>
      {editingSub ? (
        <editSub sub={editingSub} onDone={() => setEditingSub(null)} />
      ) : (
        <addSub />
      )}
      <subList onEdit={setEditingSub} />
    </div>
  );
};

export default App;


import { useEffect, useState } from "react";

const subList = ({ onEdit }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/submissions")
      .then((res) => res.json())
      .then(setSubmissions);
  }, []);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">Submissions</h2>
      {submissions.map((sub) => (
        <div key={sub.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-medium">{sub.name}</h3>
          <p className="text-sm text-gray-600">{sub.message}</p>
          <button
            onClick={() => onEdit(sub)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default subList;


import { useState } from "react";

const addSub = () => {
  const [name, setName] = useState("");
  const [message, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSub = { name, message };

    fetch("http://localhost:3000/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSub),
    })
      .then(() => {
        setTitle("");
        setContent("");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add Submission</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default addSub;


import { useState } from "react";

const editSub = ({ sub, onDone }) => {
  const [name, setName] = useState(sub.name);
  const [message, setMessage] = useState(sub.message);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/submissions/${sub.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    }).then(onDone);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Submission</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onDone}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default editSub;
