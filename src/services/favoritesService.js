import { apiEndPoint } from './variables';

export const creatingFavorite = async (favorite, token) => {
  const response = await fetch(`${apiEndPoint}/favorites`, {
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
  const response = await fetch(`${apiEndPoint}/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
};
