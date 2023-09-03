const nullEmail = {
  email: "",
  password: "secret_admin",
}

const nullPassword = {
  email: "admin@admin.com",
  password: "",
}

const validateLogin = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzcwMzA4OCwiZXhwIjoxNjkzNzg5NDg4fQ.TydpO6FbkZLhozic4s_tHY0kVIY_RhO-IUb23QX5elc"
}

const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export default {
  nullEmail,
  nullPassword,
  validateLogin,
  token,
  user,
}