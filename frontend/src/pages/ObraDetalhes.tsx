import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Add Link aqui
import Layout from "../components/Layout";
import Container from "../components/Container";
import { api } from "../services/api";

type ArtworkDetails = {
  title: string;
  patrimonyNumber?: string;
  chronology?: string;
  authorship?: string;
  technique?: string;
  dimensions?: string;
  description?: string;
  coverImage?: string;
};

export default function ObraDetalhes() {
  const { slug } = useParams();
  const [obra, setObra] = useState<ArtworkDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadObra() {
      try {
        const response = await api.get(`/artworks/${slug}`);
        setObra(response.data);
      } catch (error) {
        console.error("Erro ao carregar a obra:", error);
      } finally {
        setLoading(false);
      }
    }
    loadObra();
  }, [slug]);

  if (loading) return <Layout><Container><p>Carregando...</p></Container></Layout>;
  if (!obra) return <Layout><Container><p>Obra não encontrada.</p></Container></Layout>;

  return (
    <Layout>
      <Container>
        {/* Usando Link nativo do React Router */}
        <Link to="/acervo" className="btn-voltar">
          &larr; Voltar ao Acervo
        </Link>

        <main className="obra-detalhes-container">
          <section className="obra-imagem-container">
            {obra.coverImage ? (
              <img 
                src={`http://localhost:3000${obra.coverImage}`} 
                alt={obra.title} 
              />
            ) : (
              <div className="imagem-placeholder">Imagem indisponível</div>
            )}
          </section>

          <section className="obra-info-container">
            {obra.patrimonyNumber && (
              <p><strong>número de patrimônio:</strong> {obra.patrimonyNumber}</p>
            )}
            <p><strong>título:</strong> {obra.title}</p>
            
            {obra.chronology && (
              <p><strong>cronologia:</strong> {obra.chronology}</p>
            )}
            
            {obra.authorship && (
              <p><strong>autoria:</strong> {obra.authorship}</p>
            )}
            
            {obra.technique && (
              <p><strong>técnica | material:</strong> {obra.technique}</p>
            )}
            
            {obra.dimensions && (
              <p><strong>dimensões:</strong> {obra.dimensions}</p>
            )}
            
            {obra.description && (
              <p><strong>descrição:</strong> {obra.description}</p>
            )}
          </section>
        </main>
      </Container>
    </Layout>
  );
}