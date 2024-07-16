const CSRFToken = (cookies) => {
  const cookiesArray = cookies.split('; ');
  const csrfCookie = cookiesArray.find((cookie) => cookie.startsWith('CSRF-TOKEN='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

export default CSRFToken;
