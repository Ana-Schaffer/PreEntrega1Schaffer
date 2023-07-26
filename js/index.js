class Producto {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }

  class Tienda {
    constructor() {
      this.productos = []; 
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
          const eliminarBtn = document.createElement("button");
          eliminarBtn.textContent = "Eliminar";
          eliminarBtn.dataset.productName = productoEncontrado.nombre;
          eliminarBtn.addEventListener("click", () => this.eliminarDelCarrito(productoEncontrado.nombre));
          cartItem.appendChild(nombre);
          cartItem.appendChild(cantidad);
          cartItem.appendChild(precio);
          cartItem.appendChild(eliminarBtn);
          cartProductsElement.appendChild(cartItem);
        }
      });

      const cartTotalElement = document.getElementById("cartTotal");
      cartTotalElement.textContent = "Total: $" + this.cartTotal.toFixed(2);

      // Guardar datos en LocalStorage
      this.saveToLocalStorage();
    }

    agregarAlCarrito(productoNombre) {
      // Llamada a la API para obtener los detalles del producto
      fetch(`http://localhost:3000/productos?nombre=${productoNombre}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            this.productos = data; // Guardar los productos obtenidos de la API
            const nuevoProducto = new Producto(data[0].nombre, data[0].precio);
            const productoEncontrado = this.productos.find(p => p.nombre === nuevoProducto.nombre);

            if (productoEncontrado) {
              const productoSeleccionado = { nombre: nuevoProducto.nombre, cantidad: 1 };
              const index = this.productosSeleccionados.findIndex(p => p.nombre === productoSeleccionado.nombre);

              if (index !== -1) {
                this.productosSeleccionados[index].cantidad++;
              } else {
                this.productosSeleccionados.push(productoSeleccionado);
              }

              this.cartCount++;
              this.cartTotal += nuevoProducto.precio;

              // Mostrar mensaje de producto agregado al carrito
              this.mostrarMensaje("¡Producto agregado al carrito!");

              this.mostrarProductosSeleccionados();
              this.actualizarContadorCarrito();
            } else {
              console.log("El producto no existe en la API");
            }
          } else {
            console.log("El producto no existe en la API");
          }
        })
        .catch(error => {
          console.error("Error al obtener los detalles del producto:", error);
        });
    }

    eliminarDelCarrito(productoNombre) {
      const index = this.productosSeleccionados.findIndex(p => p.nombre === productoNombre);
      if (index !== -1) {
        const productoEncontrado = this.productos.find(p => p.nombre === productoNombre);
        if (productoEncontrado) {
          this.cartCount -= this.productosSeleccionados[index].cantidad;
          this.cartTotal -= productoEncontrado.precio * this.productosSeleccionados[index].cantidad;
          this.productosSeleccionados.splice(index, 1);
          this.mostrarProductosSeleccionados();
          this.actualizarContadorCarrito();
        }
      }
    }

    mostrarMensaje(mensaje) {
      const mensajeElement = document.getElementById("mensaje");
      mensajeElement.textContent = mensaje;
      mensajeElement.style.display = "block";
      setTimeout(() => {
        mensajeElement.style.display = "none";
      }, 2000); // Mostrar el mensaje durante 2 segundos
    }

    actualizarContadorCarrito() {
      const cartCountElement = document.getElementById("cartCount");
      cartCountElement.textContent = this.cartCount.toString();

      // Guardar datos en LocalStorage
      this.saveToLocalStorage();
    }

    comprar() {
      // Mostrar mensaje de "Gracias por su compra" después de cerrar la ventana modal
      const cartModal = document.getElementById("cartModal");
      cartModal.style.display = "none";

      this.mostrarMensajeCompra();

      this.productosSeleccionados = [];
      this.cartCount = 0;
      this.cartTotal = 0;
      this.mostrarProductosSeleccionados();
      this.actualizarContadorCarrito();
    }

    mostrarMensajeCompra() {
      const mensajeElement = document.getElementById("compraMensaje");
      mensajeElement.textContent = "¡Gracias por su compra!";
      mensajeElement.style.display = "block";
      setTimeout(() => {
        mensajeElement.style.display = "none";
      }, 3000); // Mostrar el mensaje durante 3 segundos
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

      const comprarButton = document.getElementById("comprarButton");
      comprarButton.addEventListener("click", () => {
        this.comprar();
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

    inicializar() {


      // Llamar al método saludar para configurar los eventos y mostrar el estado actual del carrito
      this.saludar();
    }
  }

  const tienda = new Tienda();
  tienda.inicializar();












