import React from 'react';

const Lobby = ({ username, handleUsernameChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
