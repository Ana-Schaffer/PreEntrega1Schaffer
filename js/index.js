class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Tienda {
  constructor() {
    this.productos = [
      new Producto("Chanel", 35000),
      new Producto("My Way", 25000),
      new Producto("ScandaL", 30000),
      new Producto("Dior", 40000)
    ];
    this.productosSeleccionados = [];
  }

  mostrarProductos() {
    let mensaje = "Productos disponibles:\n";
    this.productos.forEach(producto => {
      mensaje += producto.nombre + " - $" + producto.precio + "\n";
    });
    alert(mensaje);
  }

  calcularCostoTotal() {
    let costoTotal = 0;
    this.productosSeleccionados.forEach(producto => {
      const productoEncontrado = this.productos.find(p => p.nombre === producto.nombre);
      if (productoEncontrado) {
        costoTotal += productoEncontrado.precio * producto.cantidad;
      } else {
        alert("El producto " + producto.nombre + " no es válido.");
        return null;
      }
    });
    return costoTotal;
  }

  calcularPagosCuotas(montoTotal, cuotas) {
    if (cuotas <= 0) {
      alert("La cantidad de cuotas debe ser mayor a cero.");
      return null;
    }

    let pagoPorCuota = (montoTotal / cuotas).toFixed(2);
    let montoTotalFormateado = montoTotal.toFixed(2);
    alert("El monto total a pagar es: $" + montoTotalFormateado + "\n" +
      "Pagos en " + cuotas + " cuotas de $" + pagoPorCuota + " cada una.");
  }

  saludar() {
    alert("¡Bienvenido a Imported fragances!");

    this.mostrarProductos();

    while (true) {
      let opcion = prompt("Ingrese el nombre del producto que desea comprar (o 'salir' para finalizar):");
      opcion = opcion.toLowerCase();
      if (opcion === "salir") {
        break;
      }

      const productoEncontrado = this.productos.find(p => p.nombre.toLowerCase() === opcion);
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

    let costoTotal = this.calcularCostoTotal();
    if (costoTotal !== null) {
      alert("El costo total de los productos seleccionados es: $" + costoTotal.toFixed(2));

      let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
      this.calcularPagosCuotas(costoTotal, cuotas);
    }
  }
}

const tienda = new Tienda();
tienda.saludar();












