import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import logoImg from "../assets/navbar-logo.png"; 

export default function Navbar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const value = Math.min(window.scrollY / 250, 1);
      setScroll(value);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="navbar"
      style={
        {
          "--scroll": scroll,
        } as React.CSSProperties
      }
    >
      {/* Transformed into a Link to homepage wrapping the image */}
      <Link to="/" className="logo">
        <img src={logoImg} alt="Centro Cultural" />
      </Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/programacao">Programação</Link>
        <Link to="/exposicoes">Exposições</Link>
        <Link to="/acervo">Acervo</Link>
      </nav>
    </header>
  );
}