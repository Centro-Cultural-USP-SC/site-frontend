import logo1 from "../assets/logo-cc.png";
import logo2 from "../assets/logo-pusp.png";
import logo3 from "../assets/logo-grupocoord.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logos">
        <img src={logo1} alt="Logo Centro Cultural" className="footer-logo" />
        <img src={logo2} alt="Logo PUSP" className="footer-logo" />
        <img src={logo3} alt="Logo Grupo Coordenador" className="footer-logo" />
      </div>
      <div>São Carlos — Brasil</div>
    </footer>
  );
}