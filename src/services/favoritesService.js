export const creatingFavorite = async (favorite, token) => {
  const mockUrl = 'http://localhost:3001/favorites';
  const response = await fetch(mockUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(favorite),
  });
  if (!response.ok) throw new Error(response.statusText);
  const dataResponse = await response.json();
  return dataResponse;
};

export const deletingFavorite = async (id, token) => {
  const mockUrl = `http://localhost:3001/favorites/${id}`;
  const response = await fetch(mockUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
};
