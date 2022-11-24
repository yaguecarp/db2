import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "./style.css";
import {
  AiOutlinePoweroff,
  AiOutlineUser,
  AiFillCheckCircle,
} from "react-icons/ai";

export default function Checkout() {
  const [isLoged, setIsLoged] = useState(false);
  const cookies = new Cookies();
  const [pedidos, setPedidos] = useState(0);
  const [facturas, setFacturas] = useState(0);
  const [pagos, setPagos] = useState(0);

  const logout = () => {
    cookies.remove("token");
    setIsLoged(false);
    console.log("Loged out");
  };

  console.log(cookies.get("token"));

  // useEffect(() => {
  //   fetch("http://localhost:3001/api/facturas")
  //     .then((res) => res.json())
  //     .then((fac) => setFacturas(fac));
  // }, []);

  // const proxNroPedido = pedidos.length + 1;
  // const proxNroFactura = facturas.length + 1;

  const listaItems = cookies.get("checkout").item;
  const itemObj = listaItems.map((elem) => {
    const producto = elem[0];
    const cantidad = elem[1];
    return {
      producto: producto,
      cantidad: cantidad,
    };
  });

  //generar pedido

  useEffect(() => {
    if (pedidos === 0) {
      fetch("http://localhost:3001/api/pedidos")
        .then((res) => res.json())
        .then((ped) => {
          setPedidos(ped.length + 1);
        });
    } else {
      var date = new Date();
      var data = {
        nroPedido: pedidos.toString(),
        fecha: date.toString(),
        totalNeto: cookies.get("checkout").total.toString(),
        estado: "activo",
        items: itemObj,
      };

      // console.log(pedidos)
      console.log(JSON.stringify(data));

      fetch("http://localhost:3001/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("token"),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  }, [pedidos]);

  //generar factura

  useEffect(() => {
    if (facturas === 0) {
      fetch("http://localhost:3001/api/facturas")
        .then((res) => res.json())
        .then((fac) => setFacturas(fac.length+1));
    }
    var date = new Date();
    var data = {
      nroFactura: facturas,
      fecha: date.toString(),
      cae: "-",
      puntoVenta: "-",
      totalNeto: cookies.get("checkout").total.toString(),
      impuestos: "-",
      detalle: itemObj,
      descuento: "-",
    };

    // console.log(JSON.stringify(data));

    fetch("http://localhost:3001/api/facturas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [facturas]);

  //generar pago

  useEffect(() => {
    if (pagos === 0) {
      fetch("http://localhost:3001/api/pagos")
        .then((res) => res.json())
        .then((pag) => {
          setPagos(pag.length+1);
        });
    } else {
      var date = new Date();
      var dateFormat = `${date.getFullYear()}-${date.getDay()}-${date.getMonth()}`;
      var data = {
        nroPago: pagos,
        fecha: dateFormat,
        formaPago: "MERCADO PAGO",
        factura: facturas.toString(),
        total: cookies.get("checkout").total.toString(),
      };

      fetch("http://localhost:3001/api/pagos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("token"),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  }, [pagos]);

  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          <Link to={"/"}
              style={{ color: "inherit", textDecoration: "none" }}>
          <h1>Electronica Godio</h1>
          </Link>
        </div>
        <div className="links">
          <li>
            <Link
              to={"/profile"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <AiOutlineUser />
            </Link>
          </li>

          <li>
            <Link
              onClick={logout}
              to={"/login"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <AiOutlinePoweroff />
            </Link>
          </li>
        </div>
      </nav>

      <div className="checkout-container">
        <div className="checkout-msj">
          <h1>Se ha generado el pedido!</h1>
          <h2>Gracias por su compra</h2>
          <h3>
            <AiFillCheckCircle />
          </h3>
        </div>
      </div>
    </>
  );
}
