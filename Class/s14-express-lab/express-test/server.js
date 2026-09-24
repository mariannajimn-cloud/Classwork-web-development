import express from 'express';
// const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
  <div class="card-response">
    <h3>¡Registro exitoso!</h3>
    <p>Hemos procesado tu solicitud correctamente. Revisa tu correo electrónico para verificar tu cuenta.</p>
    <span class="status-badge success">Estado: Activo</span>
    </div>);
    `);
});

app.get('/greet', (req, res) => {
    const {name, city } = req.query;
    res.send(`Hello ${name}, how is the weather in ${city}`);
});

app.get('/about', (req, res) => {
  res.send('This is my WebApp Class project');
});

app.post('/about', (req, res) => {
  res.send('This is my WebApp Class project, but secure');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});