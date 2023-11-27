export default async function updateProfile(id, data, token) {
  const mockUrl = `http://localhost:3001/accounts/${id}`;
  const response = await fetch(mockUrl, {
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
