// Buggy API file
// Bug: Hardcoded URL
const API_URL = 'http://localhost:8000/api/v1';

// Bug: No error handling and incorrect data parsing
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: credentials, // Bug: Should be JSON.stringify(credentials)
  });
  const data = response.text(); // Bug: Should be response.json()
  return data;
};

// Bug: Missing authorization header
export const getUserProfile = async () => {
  const response = await fetch(`${API_URL}/users/me`);
  const data = await response.json();
  return data;
};
