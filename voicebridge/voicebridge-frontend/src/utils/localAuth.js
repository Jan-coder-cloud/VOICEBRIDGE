// src/utils/localAuth.js

export function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users') || '[]')
  const exists = users.find(u => u.email === user.email)
  if (!exists) users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

export function getUser(email) {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users.find(u => u.email === email)
}

export function getAllUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null')
}

export function logoutUser() {
  localStorage.removeItem('currentUser')
}
