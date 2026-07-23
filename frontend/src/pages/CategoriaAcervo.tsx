import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import ObraCard from "../components/ObraCard";
import { api } from "../services/api";

type Categoria = { slug: string; name: string; };

type Artwork = {
  id: number;
  title: string;
  slug: string;
  coverImage?: string;
  authorship?: string;
  category: Categoria;
};

export default function CategoriaAcervo() {
  const { categoria } = useParams(); // Pega "pinturas", "desenhos" da URL
  const [obras, setObras] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  // Capitaliza a primeira letra para o título da página
  const tituloPagina = categoria 
    ? categoria.charAt(0).toUpperCase() + categoria.slice(1) 
    : "Acervo";

  useEffect(() => {
    async function loadObrasDaCategoria() {
      try {
        // Busca as obras na sua rota definida no backend
        const response = await api.get("/artworks"); 
        
        // Filtra as obras cujo slug da categoria bate com a URL
        const obrasFiltradas = response.data.filter(
          (obra: Artwork) => obra.category?.slug === categoria
        );
        
        setObras(obrasFiltradas);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadObrasDaCategoria();
  }, [categoria]);

  return (
    <Layout>
      <PageHeader 
        title={tituloPagina} 
        breadcrumb={[
          { nome: "Início", rota: "/" },
          { nome: "Acervo", rota: "/acervo" },
          { nome: tituloPagina, rota: `/acervo/${categoria}` },
        ]}
      />
      <Container>
        {loading ? (
          <p>Carregando...</p>
        ) : obras.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhuma obra cadastrada nesta categoria.</h3>
          </div>
        ) : (
          <div className="masonry-grid">
            {obras.map((obra) => (
              <ObraCard
                key={obra.id}
                title={obra.title}
                authorship={obra.authorship}
                slug={obra.slug}
                image={obra.coverImage}
              />
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
}