export default async function fetchProfile(id) {
  const mockUrl = `http://localhost:3001/accounts/${id}`;
  const response = await fetch(mockUrl);
  return response.ok
    ? Promise.resolve(response.json()) : Promise.reject(response.json());
}
