import axios from 'axios';

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

const instance = axios.create({
  headers: {
    common: {
      'X-CSRF-Token': csrfToken,
    },
    'Content-Type': 'multipart/form-data',
  },
});

const createGear = async (formData) => {
  try {
    const response = await instance.post('http://localhost:4000/gears', formData);
    console.log('Gear created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating gear:', error);
    throw error;
  }
};

export default createGear;
