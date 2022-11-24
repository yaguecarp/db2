import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "./style.css";
import {
  AiOutlinePoweroff,
  AiOutlineUser,
  AiFillCheckCircle,
} from "react-icons/ai";

export default function Profile() {
  const [isLoged, setIsLoged] = useState(false);
  const cookies = new Cookies();
  const [usuario, setUsuario] = useState({});
  const [pedidos, setPedidos] = useState([]);


  const logout = () => {
    cookies.remove("token");
    setIsLoged(false);
    console.log("Loged out");
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/usuarios/checkToken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsuario(data.user));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/pedidos/byCuil", {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setPedidos(data));
  }, []);

  console.log(usuario);
  console.log(pedidos)
  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
            <Link
            to={"/"}
            style={{ color: "inherit", textDecoration: "none" }}>
          <h1>Electronica Godio</h1>
          </Link>
        </div>
        <div className="links">
          <li>
            <AiOutlineUser />
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

      <div className="profile">
        <div className="datos-container">
          <div className="datos">
            <h1>Datos Personales:</h1>
            <h2>Nombre: {usuario.nombre}</h2>
            <h2>Apellido: {usuario.apellido}</h2>
            <h2>Cuil: {usuario.cuil}</h2>
            <h2>Email: {usuario.email}</h2>
          </div>
        </div>
        <div className="pedidos">
            <h1>Pedidos</h1>
            {pedidos.map(elem => {
                return (
                    <div className="pedido-item" key={elem._id}>
                        <h2>ID Pedido: {elem._id}</h2>
                        <h2>Fecha del pedido: {elem.fecha}</h2>
                        <h2>Total pedido: ${elem.totalNeto}</h2>
                    </div>
                )
            })}
        </div>
      </div>
    </>
  );
}
