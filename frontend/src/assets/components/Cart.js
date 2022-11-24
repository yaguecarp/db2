import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { AiFillDelete } from "react-icons/ai";

export default function Cart() {
  const [items, setItems] = useState([]);
  const cookies = new Cookies();
  const [productos, setProductos] = useState([]);
  const [subtotal, setSubtotal] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/redis", {
      headers: {
        Authorization: cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        var result = Object.entries(data);
        setItems(result);
      });
  }, []);

  const deleteItem = (elem) => {
    console.log(JSON.stringify(elem));
    var item = {
      nombreProducto: elem,
    };
    fetch("http://localhost:3001/api/redis/decrementarCantidad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        console.log(data);
      });
  };



  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
    },[])


    useEffect(()=>{
      var suma=0;
    items.forEach((i) => {
      productos.forEach((p) => {
        if (i[0] === p.nombreProducto) suma += (parseInt(p.precioNeto) * i[1]);
      });
    });
    setSubtotal(suma);

  });



  const checkout = () => {
    var cart = {
      item: items,
      total: subtotal,
    }
    cookies.set('checkout', cart, {path: '/'})
    window.location.href='checkout'
  };


  console.log(items);

  return (
    <div className="cart-container">
      <div className="cart-items">
        {items.map((elem) => {
          return (
            <div key={elem[0]} className="cart-item">
              <div className="cart-item-description">
                <h1>{elem[0]}</h1>
                <h1>Cantidad: {elem[1]}</h1>
              </div>
              <div className="cart-item-action">
                {/* <h1>{calcularPrecio}</h1> */}
                <button onClick={() => deleteItem(elem[0])}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-checkout-btn">
        <h1>Subtotal: $ {subtotal}</h1>
        <button onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
}
