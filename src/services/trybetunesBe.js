export const creatingUser = async (userObj) => {
  try {
    const response = await fetch('http://localhost:3001/accounts', {
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
