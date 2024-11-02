export const getHello = () => { // este es un metodo sincrono
  return "Hello World";
}
export const getHelloAsync = async (req, res) => { // este es un metodo asincrono, sirve para hacer peticiones a una API, o a la base de datos
// aquí iría la lógica para hacer una petición a una API
  const response = await fetch("xxxxxxx");
  return res.json(response);
}
