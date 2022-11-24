import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "./style.css";
import {
  AiOutlinePoweroff,
  AiOutlineUser,
  AiFillCheckCircle,
} from "react-icons/ai";

export default function Admin() {
  const [isLoged, setIsLoged] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [facturas, setFacturas] = useState([]);

  const cookies = new Cookies();

  const logout = () => {
    cookies.remove("token");
    setIsLoged(false);
    console.log("Loged out");
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/pagos")
      .then((res) => res.json())
      .then((data) => setPagos(data));

    fetch("http://localhost:3001/api/facturas")
      .then((res) => res.json())
      .then((data) => setFacturas(data));
  }, []);

  console.log(pagos);
  console.log(facturas);

  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
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

      <div className="admin-container">
        <div className="admin-pagos">
          <h1>PAGOS</h1>
          {pagos.map((elem) => {
            return (
              <div className="item-pago" key={elem.nroPago}>
                <h2>Numero de pago: {elem.nroPago}</h2>
                <h2>Numero de factura: {elem.factura}</h2>
                <h2>Fecha: {elem.fecha}</h2>
                <h2>Forma de pago: {elem.formaPago}</h2>
                <h2>Total: {elem.total}</h2>
              </div>
            );
          })}
        </div>
        <div className="admin-facturas">
          <h1>FACTURAS</h1>
          {facturas.map((elem) => {
            if (elem.nroFactura > 0) {
              return (
                <div className="item-factura" key={elem._id}>
                  <h2>
                    Cliente: {elem.cliente.nombre} {elem.cliente.apellido}
                  </h2>
                  <h2>Fecha: {elem.fecha}</h2>
                  <h2>Numero de factura: {elem.nroFactura}</h2>
                  <h2>Total Factura: {elem.totalNeto}</h2>
                  <div className="item-detalle">
                    <h2>Detalle:</h2>
                    {elem.detalle.map((e) => {
                      return (
                        <div key={e._id}>
                          <h3>Producto: {e.producto}</h3>
                          <h3>Cantidad: {e.cantidad}</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
