// Buggy API file
// Bug: Hardcoded URL
const API_URL = 'http://localhost:8000/api/v1';

// Bug: No error handling
export const getFoods = async () => {
  const response = await fetch(`${API_URL}/foods`);
  const data = await response.json();
  return data;
};

// Bug: Incorrect endpoint
export const getFoodById = async (id) => {
  const response = await fetch(`${API_URL}/food/${id}`);
  const data = await response.json();
  return data;
};
