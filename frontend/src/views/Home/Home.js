import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "./style.css";

import { FaShoppingCart } from "react-icons/fa";
import { AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";

import Productos from "../../assets/components/Productos";
import Cart from "../../assets/components/Cart";

export default function Home() {
  const [isLoged, setIsLoged] = useState(false);
  const cookies = new Cookies();

  useEffect(()=>{
    if (cookies.get('token')) setIsLoged(true)
    else window.location.href='login'
    console.log(cookies.get('token'))

  }, [isLoged])

  const logout = () => {
    cookies.remove('token')
    setIsLoged(false)
    console.log("Loged out")
  }

  // if (cookies.get('token') !== undefined) setIsLoged(true);

  if (isLoged){
    return (
      <>
        <nav className="nav">
          <div className="nav-brand">
            <h1>Electronica Godio</h1>
          </div>
          <div className="links">
            <li>
              <Link to={"/profile"}
              style={{ color: "inherit", textDecoration: "none" }}>
              <AiOutlineUser />
              </Link>
            </li>
            {/* <li>
              <FaShoppingCart />
            </li> */}
            <li > 
              <Link onClick={logout}
                 to={"login"}
                style={{ color: "inherit", textDecoration: "none" }}
                
              >
                <AiOutlinePoweroff />
              </Link>
            </li>
          </div>
        </nav>
  
        <div className="main-container">
          <section className="catalogo">
            <Productos />
          </section>
  
          <aside className="cart">
            <FaShoppingCart className="cart-logo" />
            <hr />
            <Cart />
          </aside>
        </div>
      </>
    );
  }
  else{
    return <h1>no estas log</h1>
  }



  
}
