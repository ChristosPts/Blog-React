import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      if (response.status === 200) {
        alert('Registration successful');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Name already taken');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <form action="" onSubmit={register}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
