import {useState} from "react";
import submissionList from ""

import React, {useEffect,useState} from "react";

const submissionList=({onEdit})=>{

  const [submissions, setSubmissions]=useState([]);

  useEffect(() =>{
    fetch("http://localhost:3000/form-submissions")
    .then((res) =>res.json())
    .then(setSubmissions);
  },[]);

return(
<div>
  <h1>Submissions Form</h1>
  {form-submissions.map(submission => (
    <div key={submission.id}>
      <h3>{submission.name}</h3>
      <h3>{submission.email}</h3>
      <p>{submission.message}</p>
      <button onClick={() => onEdit(submission)}>Edit</button>
  }
  </div>
))}
</div>
);
};

export default App;