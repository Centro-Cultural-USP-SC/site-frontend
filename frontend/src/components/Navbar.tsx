import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        Centro Cultural
      </div>

      <nav>
        <Link to="/">
          Início
        </Link>

        <Link to="/programacao">
          Programação
        </Link>

        <Link to="/exposicoes">
          Exposições
        </Link>

        <Link to="/acervo">
          Acervo
        </Link>
      </nav>
    </header>
  );
}