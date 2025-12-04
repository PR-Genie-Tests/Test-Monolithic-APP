import React, { useState } from 'react';

// Bug: State management issues
const UserProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    // Bug: Does not actually save the name
    setEditing(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {editing ? (
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {name}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
