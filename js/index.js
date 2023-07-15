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
    this.cartCount = 0;
    this.cartTotal = 0;

    // Restaurar datos desde LocalStorage
    this.restoreFromLocalStorage();
  }

  restoreFromLocalStorage() {
    const storedProductosSeleccionados = localStorage.getItem('productosSeleccionados');
    if (storedProductosSeleccionados) {
      this.productosSeleccionados = JSON.parse(storedProductosSeleccionados);
    }

    const storedCartCount = localStorage.getItem('cartCount');
    if (storedCartCount) {
      this.cartCount = parseInt(storedCartCount);
    }

    const storedCartTotal = localStorage.getItem('cartTotal');
    if (storedCartTotal) {
      this.cartTotal = parseFloat(storedCartTotal);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('productosSeleccionados', JSON.stringify(this.productosSeleccionados));
    localStorage.setItem('cartCount', this.cartCount.toString());
    localStorage.setItem('cartTotal', this.cartTotal.toFixed(2));
  }

  mostrarProductosSeleccionados() {
    const cartProductsElement = document.getElementById("cartProducts");
    cartProductsElement.innerHTML = "";

    this.productosSeleccionados.forEach(producto => {
      const productoEncontrado = this.productos.find(p => p.nombre === producto.nombre);
      if (productoEncontrado) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        const nombre = document.createElement("p");
        nombre.textContent = productoEncontrado.nombre;
        const cantidad = document.createElement("p");
        cantidad.textContent = "Cantidad: " + producto.cantidad;
        const precio = document.createElement("p");
        precio.textContent = "Precio: $" + (productoEncontrado.precio * producto.cantidad).toFixed(2);
        cartItem.appendChild(nombre);
        cartItem.appendChild(cantidad);
        cartItem.appendChild(precio);
        cartProductsElement.appendChild(cartItem);
      }
    });

    const cartTotalElement = document.getElementById("cartTotal");
    cartTotalElement.textContent = "Total: $" + this.cartTotal.toFixed(2);

    // Guardar datos en LocalStorage
    this.saveToLocalStorage();
  }

  agregarAlCarrito(productoNombre) {
    const productoEncontrado = this.productos.find(p => p.nombre === productoNombre);
    if (productoEncontrado) {
      const productoSeleccionado = { nombre: productoEncontrado.nombre, cantidad: 1 };
      const index = this.productosSeleccionados.findIndex(p => p.nombre === productoSeleccionado.nombre);
      if (index !== -1) {
        this.productosSeleccionados[index].cantidad++;
      } else {
        this.productosSeleccionados.push(productoSeleccionado);
      }

      this.cartCount++;
      this.cartTotal += productoEncontrado.precio;

      console.log("Producto agregado al carrito");
      this.mostrarProductosSeleccionados();
      this.actualizarContadorCarrito();
    } else {
      console.log("El producto no existe");
    }
  }

  actualizarContadorCarrito() {
    const cartCountElement = document.getElementById("cartCount");
    cartCountElement.textContent = this.cartCount.toString();

    // Guardar datos en LocalStorage
    this.saveToLocalStorage();
  }

  saludar() {
    console.log("¡Bienvenido a Imported Fragances!");

    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(button => {
      button.addEventListener("click", () => {
        const productName = button.dataset.productName;
        this.agregarAlCarrito(productName);
      });
    });

    const cartButton = document.getElementById("cartButton");
    cartButton.addEventListener("click", () => {
      this.mostrarProductosSeleccionados();
      const cartModal = document.getElementById("cartModal");
      cartModal.style.display = "block";
    });

    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.addEventListener("click", () => {
      const cartModal = document.getElementById("cartModal");
      cartModal.style.display = "none";
    });

    // Restaurar estado del carrito al cargar la página
    this.mostrarProductosSeleccionados();
    this.actualizarContadorCarrito();
  }
}

const tienda = new Tienda();
tienda.saludar();

  


















  