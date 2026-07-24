import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <div className="logo">
        Centro Cultural
      </div>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/programacao">Programação</Link>
        <Link to="/exposicoes">Exposições</Link>
        <Link to="/acervo">Acervo</Link>
      </nav>
    </header>
  );
}