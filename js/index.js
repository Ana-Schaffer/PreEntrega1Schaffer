const productos = [
  { nombre: "Chanel", precio: 35000 },
  { nombre: "My Way", precio: 25000 },
  { nombre: "ScandaL", precio: 30000 },
  { nombre: "Dior", precio: 40000 }
];

const mostrarProductos = () => {
  let mensaje = "Productos disponibles:\n";
  productos.forEach(producto => {
    mensaje += producto.nombre + " - $" + producto.precio + "\n";
  });
  alert(mensaje);
};

const calcularCostoTotal = productosSeleccionados => {
  let costoTotal = 0;
  productosSeleccionados.forEach(producto => {
    const productoEncontrado = productos.find(p => p.nombre === producto.nombre);
    if (productoEncontrado) {
      costoTotal += productoEncontrado.precio * producto.cantidad;
    } else {
      alert("El producto " + producto.nombre + " no es válido.");
      return null;
    }
  });
  return costoTotal;
};

const calcularPagosCuotas = (montoTotal, cuotas) => {
  if (cuotas <= 0) {
    alert("La cantidad de cuotas debe ser mayor a cero.");
    return null;
  }

  let pagoPorCuota = (montoTotal / cuotas).toFixed(2);
  let montoTotalFormateado = montoTotal.toFixed(2);
  alert("El monto total a pagar es: $" + montoTotalFormateado + "\n" +
    "Pagos en " + cuotas + " cuotas de $" + pagoPorCuota + " cada una.");
};

function saludar() {
  alert("¡Bienvenido a Imported fragances!");

  mostrarProductos();

  this.productosSeleccionados = [];

  while (true) {
    let opcion = prompt("Ingrese el nombre del producto que desea comprar (o 'salir' para finalizar):");
    opcion = opcion.toLowerCase();
    if (opcion === "salir") {
      break;
    }

    const productoEncontrado = productos.find(p => p.nombre.toLowerCase() === opcion);
    if (productoEncontrado) {
      let cantidad = parseInt(prompt("Ingrese la cantidad:"));
      const productoSeleccionado = { nombre: productoEncontrado.nombre, cantidad };
      const index = this.productosSeleccionados.findIndex(p => p.nombre === productoSeleccionado.nombre);
      if (index !== -1) {
        this.productosSeleccionados[index].cantidad += cantidad;
      } else {
        this.productosSeleccionados.push(productoSeleccionado);
      }
    } else {
      alert("El producto " + opcion + " no está definido.");
    }
  }

  let costoTotal = calcularCostoTotal(this.productosSeleccionados);
  if (costoTotal !== null) {
    alert("El costo total de los productos seleccionados es: $" + costoTotal.toFixed(2));

    let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
    calcularPagosCuotas(costoTotal, cuotas);
  }
}

saludar();











