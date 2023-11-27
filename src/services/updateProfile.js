import { apiEndPoint } from './variables';

export default async function updateProfile(id, data, token) {
  const response = await fetch(`${apiEndPoint}/accounts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const dataResponse = await response.json();
  return dataResponse;
}
