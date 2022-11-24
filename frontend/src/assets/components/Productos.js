import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { FaCartPlus } from "react-icons/fa";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
    // eslint-disable-next-line
  }, []);

  console.log(productos);

  const addToCart = (em) => {
    console.log(em._id)

    var data = {
      nombreProducto: em.nombreProducto,
      cantidad: 1
    }
    fetch("http://localhost:3001/api/redis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get('token')
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then(msj => console.log(msj))

    window.location.reload()
  }

  return (
    <>
      {/* <h1>Hola mundo</h1> */}
      <div className="container">
        {productos.map((elem) => {
          return (
            <div key={elem._id} className="product-card">
              <div className="card-title">
                <h2>{elem.nombreProducto}</h2>
              </div>
              <div className="card-description">
                <img
                  src={elem.foto}
                  alt=""
                />
                <p>
                  {elem.descripcion}
                </p>
              </div>
              <div className="precio">
                <h2>U$D {elem.precioNeto}</h2>
              </div>
              <div className="card-actions" >
                <button onClick={() => addToCart(elem)}>
                  <FaCartPlus  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
