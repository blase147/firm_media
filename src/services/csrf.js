// src/services/csrf.js
const CSRFToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  return csrfToken;
};

export default CSRFToken;
