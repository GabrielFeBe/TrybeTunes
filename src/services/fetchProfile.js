export default async function fetchProfile() {
  const mockUrl = 'https://api.github.com/users/tryber/repos';
  const response = await fetch(mockUrl);
  return response.ok
    ? Promise.resolve(response.json()) : Promise.reject(response.json());
}
