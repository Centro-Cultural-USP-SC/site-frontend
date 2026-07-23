import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Layout from "../components/Layout";
import Container from "../components/Container";

import destaque from "../assets/pinturas/resignacao.jpg";
import pintura from "../assets/acervo/sem_titulo.jpg";
import desenho from "../assets/acervo/obestiario.jpg";
import gravura from "../assets/acervo/partonocortico.jpg";
import fotografia from "../assets/acervo/bailarina.jpg";
import escultura from "../assets/acervo/cavalo.jpg";
import textil from "../assets/acervo/arcoiris.jpg";

import "../styles/global.css";

const categorias = [
  {
    titulo: "Pinturas",
    imagem: pintura,
    rota: "/acervo/pinturas",
  },
  {
    titulo: "Desenhos",
    imagem: desenho,
    rota: "/acervo/desenhos",
  },
  {
    titulo: "Gravuras",
    imagem: gravura,
    rota: "/acervo/gravuras",
  },
  {
    titulo: "Fotografias",
    imagem: fotografia,
    rota: "/acervo/fotografias",
  },
  {
    titulo: "Esculturas",
    imagem: escultura,
    rota: "/acervo/esculturas",
  },
  {
    titulo: "Têxtil",
    imagem: textil,
    rota: "/acervo/textil",
  },
];

export default function Acervo() {
  return (
<Layout>  
    <main className="acervo">
      <PageHeader
        title="Acervo Artístico"
        breadcrumb={[
          { nome: "Início", rota: "/" },
          { nome: "Acervo", rota: "/acervo" },
        ]}
      />
    <Container>
      <section className="acervo-banner">
        <img
          src={destaque}
          alt="Acervo Artístico"
        />
      </section>

      <section className="categorias-grid">

        {categorias.map((categoria) => (

          <Link
            key={categoria.titulo}
            to={categoria.rota}
            className="categoria-card"
          >

            <div className="categoria-imagem">
              <img
                src={categoria.imagem}
                alt={categoria.titulo}
              />
            </div>

            <h2>{categoria.titulo}</h2>

          </Link>

        ))}

      </section>
      </Container>
    </main>
  </Layout>
  );
}