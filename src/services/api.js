const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token && token.getAttribute('content');
};

const createBooking = async (bookingData) => {
  try {
    const csrfToken = getCsrfToken();
    const response = await fetch('http://localhost:4000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ booking: bookingData }),
      credentials: 'same-origin',
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

const getBookings = async () => {
  try {
    const csrfToken = getCsrfToken();
    const response = await fetch('http://localhost:4000/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Bookings data:', data); // Log the data received
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export { createBooking, getBookings };
