// Function to retrieve CSRF token from meta tag
const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token && token.getAttribute('content');
};

// Function to create equipment via API
const createEquipment = async (equipmentData) => {
  try {
    const csrfToken = getCsrfToken();
    const response = await fetch('http://localhost:4000/equipments', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      body: equipmentData,
      mode: 'cors', // Ensure CORS is enabled
      credentials: 'same-origin', // Send cookies (including CSRF token)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Function to fetch equipment data from API
const getEquipments = async () => {
  try {
    const csrfToken = getCsrfToken();
    const response = await fetch('http://localhost:4000/equipments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      mode: 'cors', // Ensure CORS is enabled
      credentials: 'same-origin', // Send cookies (including CSRF token)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Equipment data:', data); // Log the data received
    return data;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw error;
  }
};

export { createEquipment, getEquipments };
