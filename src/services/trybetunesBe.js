import { apiEndPoint } from './variables';

export const creatingUser = async (userObj) => {
  try {
    const response = await fetch(`${apiEndPoint}/accounts`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (userObj) => {
  try {
    const response = await fetch(`${apiEndPoint}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
