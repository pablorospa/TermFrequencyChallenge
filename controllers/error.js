const error400 = (res) => {
  res.set('Content-Type', 'text/html');
  res.status(400).json({ Error400: 'Parámetros incorrectos- Consule la documentación de la API' });
};

module.exports.error400 = error400;
