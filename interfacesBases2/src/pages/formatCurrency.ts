
const formatCurrency = (value:number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP", // Cambia a "COP", "EUR", etc., según la moneda
  }).format(value);
};

export default formatCurrency;