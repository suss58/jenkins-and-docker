import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <div className="App">

      <h1>Simple Form</h1>
      <label>simple program of testing docker and jenkins</label>
      <label>\n simple program of testing docker and jenkins</label>
      <label>\n  program of testing docker and 22222222</label>
      <label>\n  program of testing docker and 22222333333333333333</label>
      <label>\n docker and jenkins</label>
      <h1>Simple Form</h1>
      <h1>Simple Form</h1>
      <h1>Simple 2222222222 Form</h1>
      <h1>Simple 33333 Form</h1>
      <h1>testing added      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
