const precios = {
  "Chanel": 35000,
  "My Way": 25000,
  "ScandaL": 30000,
  "Dior": 40000
};

function mostrarProductos() {
  let mensaje = "Productos disponibles:\n";
  for (let producto in precios) {
    mensaje += producto + " - $" + precios[producto] + "\n";
  }
  alert(mensaje);
}

function calcularCostoTotal(productosSeleccionados) {
  let costoTotal = 0;
  for (let producto in productosSeleccionados) {
    if (precios.hasOwnProperty(producto)) {
      costoTotal += precios[producto] * productosSeleccionados[producto];
    } else {
      alert("El producto " + producto + " no es válido.");
      return null;
    }
  }
  return costoTotal;
}

function calcularPagosCuotas(montoTotal, cuotas) {
  if (cuotas <= 0) {
    alert("La cantidad de cuotas debe ser mayor a cero.");
    return null;
  }

  let pagoPorCuota = (montoTotal / cuotas).toFixed(2);
  let montoTotalFormateado = montoTotal.toFixed(2);
  alert("El monto total a pagar es: $" + montoTotalFormateado + "\n" +
    "Pagos en " + cuotas + " cuotas de $" + pagoPorCuota + " cada una.");
}

function saludar() {
  alert("¡Bienvenido a Imported fragances!");

  mostrarProductos();

  let productosSeleccionados = {};

  while (true) {
    let opcion = prompt("Ingrese el nombre del producto que desea comprar (o 'salir' para finalizar):");
    opcion = opcion.toLowerCase();
    if (opcion === "salir") {
      break;
    }

    let productoEncontrado = false;
    for (let producto in precios) {
      if (producto.toLowerCase() === opcion) {
        productoEncontrado = true;
        let cantidad = parseInt(prompt("Ingrese la cantidad:"));
        if (productosSeleccionados.hasOwnProperty(producto)) {
          productosSeleccionados[producto] += cantidad;
        } else {
          productosSeleccionados[producto] = cantidad;
        }
        break;
      }
    }

    if (!productoEncontrado) {
      alert("El producto " + opcion + " no está definido.");
    }
  }

  let costoTotal = calcularCostoTotal(productosSeleccionados);
  if (costoTotal !== null) {
    alert("El costo total de los productos seleccionados es: $" + costoTotal.toFixed(2));

    let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
    calcularPagosCuotas(costoTotal, cuotas);
  }
}

saludar();










