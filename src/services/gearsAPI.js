import axios from 'axios';

const createGear = async (formData, csrfToken) => {
  try {
    const response = await axios.post('http://localhost:4000/gears', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-Token': csrfToken,
      },
    });
    console.log('Gear created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating gear:', error);
    throw error;
  }
};

export default createGear;
