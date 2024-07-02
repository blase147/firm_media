const createBooking = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:4000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ booking: bookingData }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error); // Log error
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export default createBooking;
