export default async function fetchProfileForPage(id) {
  const mockUrl = `http://localhost:3001/accounts/${id}`;
  const response = await fetch(mockUrl);
  if (!response.ok) throw new Error('Error');
  const data = await response.json();
  return data;
}
