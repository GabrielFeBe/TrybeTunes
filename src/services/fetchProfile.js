import { apiEndPoint } from './variables';

export default async function fetchProfile(id) {
  const response = await fetch(`${apiEndPoint}/accounts/${id}`);
  return response.ok
    ? Promise.resolve(response.json()) : Promise.reject(response.json());
}
