import React from 'react';

// Bug: No validation
const UserForm = () => (
  <form>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button type="submit">Submit</button>
  </form>
);

export default UserForm;
