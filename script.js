// ============================================
// FRONTEND LOGIC - LOGIN SIGNUP UI
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const authContainer = document.getElementById('auth-container');
const thankyouContainer = document.getElementById('thankyou-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const tabBtns = document.querySelectorAll('.tab-btn');
const authTabs = document.querySelector('.auth-tabs');
const toastContainer = document.getElementById('toast-container');
const backToLoginBtn = document.getElementById('back-to-login-btn');

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '&#10004;' : '&#10008;'}</span>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(btn, loading) {
  if (loading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Please wait...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalText;
    btn.disabled = false;
  }
}

// ============================================
// TAB SWITCHING
// ============================================

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    authTabs.dataset.active = tab;
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById(`${tab}-form`).classList.add('active');
  });
});

// ============================================
// PASSWORD TOGGLE
// ============================================

document.querySelectorAll('.toggle-password').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const input = document.getElementById(toggle.dataset.target);
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '\u{1F440}';
    } else {
      input.type = 'password';
      toggle.textContent = '\u{1F441}';
    }
  });
});

// ============================================
// API CALLS
// ============================================

async function registerUser(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
}

async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { 'x-auth-token': token }
  });
  if (!response.ok) {
    localStorage.removeItem('token');
    return null;
  }
  return await response.json();
}

// ============================================
// FORM HANDLERS
// ============================================

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const agreeTerms = document.getElementById('agree-terms').checked;

  if (!name || !email || !password || !confirm) {
    return showToast('Please fill in all fields', 'error');
  }
  if (!validateEmail(email)) {
    return showToast('Please enter a valid email', 'error');
  }
  if (password.length < 6) {
    return showToast('Password must be at least 6 characters', 'error');
  }
  if (password !== confirm) {
    return showToast('Passwords do not match', 'error');
  }
  if (!agreeTerms) {
    return showToast('Please agree to the terms', 'error');
  }

  const submitBtn = signupForm.querySelector('.btn-primary');
  setLoading(submitBtn, true);

  try {
    const data = await registerUser(name, email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    showToast('Account created successfully!', 'success');
    signupForm.reset();
    setTimeout(() => showThankYou(data.user), 1000);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setLoading(submitBtn, false);
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    return showToast('Please enter email and password', 'error');
  }
  if (!validateEmail(email)) {
    return showToast('Please enter a valid email', 'error');
  }

  const submitBtn = loginForm.querySelector('.btn-primary');
  setLoading(submitBtn, true);

  try {
    const data = await loginUser(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    showToast('Login successful!', 'success');
    loginForm.reset();
    setTimeout(() => showThankYou(data.user), 1000);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setLoading(submitBtn, false);
  }
});

// ============================================
// THANK YOU PAGE & NAVIGATION
// ============================================

function showThankYou(user) {
  authContainer.classList.remove('active');
  thankyouContainer.classList.add('active');
  document.getElementById('thankyou-user-name').textContent = user.name;
  document.title = 'Welcome - Royal Access';
}

function showAuth() {
  thankyouContainer.classList.remove('active');
  authContainer.classList.add('active');
  document.title = 'Login Signup - Premium Auth';
}

backToLoginBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showToast('Logged out successfully', 'success');
  showAuth();
});

// ============================================
// AUTH CHECK ON LOAD
// ============================================

async function init() {
  const token = localStorage.getItem('token');
  if (token) {
    const user = await getCurrentUser();
    if (user) {
      showThankYou(user);
    } else {
      showAuth();
    }
  } else {
    showAuth();
  }
}

init();

