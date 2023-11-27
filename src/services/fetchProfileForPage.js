import { apiEndPoint } from './variables';

export default async function fetchProfileForPage(id) {
  const response = await fetch(`${apiEndPoint}/accounts/${id}`);
  if (!response.ok) throw new Error('Error');
  const data = await response.json();
  return data;
}
