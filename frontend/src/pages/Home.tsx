import { useEffect, useState } from "react";

import { api } from "../services/api";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import ObraCard from "../components/ObraCard";
import Container from "../components/Container";
import HorizontalScroll from "../components/HorizontalScroll";

type Post = {
  id: number;
  title: string;
  coverImage: string;
  slug: string;
  summary?: string;
};

type Artwork = {
  id: number;
  title: string;
  slug: string;
  coverImage?: string;
  authorship?: string;
};

type Event = {
  id: number;
  title: string;
  coverImage: string;
  description: string;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [exposicoes, setExposicoes] = useState<Post[]>([]);
  const [acervo, setAcervo] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadContent() {
      try {
        const [eventsRes, exposicoesRes, acervoRes] = await Promise.all([
          api.get("/events"),
          api.get("/posts/exposicoes"),
          api.get("/artworks"), // Busca as obras reais do banco de dados
        ]);

        setEvents(eventsRes.data);
        setExposicoes(exposicoesRes.data);
        setAcervo(acervoRes.data);
      } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
      }
    }

    loadContent();
  }, []);

  return (
    <Layout>
      <Hero />

      <main>
        {/* PROGRAMAÇÃO */}
        <section className="section">
          <Container>
            <div className="section-header">
              <h2>Programação Cultural</h2>
            </div>

            <HorizontalScroll>
              {events.map((event) => (
                <PostCard
                  key={event.id}
                  title={event.title}
                  summary={event.description}
                  image={event.coverImage}
                />
              ))}
            </HorizontalScroll>
          </Container>
        </section>

        {/* EXPOSIÇÕES */}
        <section className="section">
          <Container>
            <div className="section-header">
              <h2>Exposições</h2>
            </div>

            <HorizontalScroll>
              {exposicoes.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  summary={post.summary}
                  image={post.coverImage}
                  slug={post.slug}
                />
              ))}
            </HorizontalScroll>
          </Container>
        </section>

        {/* ACERVO */}
        <section className="section">
          <Container>
            <div className="section-header">
              <h2>Acervo</h2>
            </div>

            <HorizontalScroll>
              {acervo.map((obra) => (
                <ObraCard
                  key={obra.id}
                  title={obra.title}
                  authorship={obra.authorship}
                  slug={obra.slug}
                  image={obra.coverImage}
                />
              ))}
            </HorizontalScroll>
          </Container>
        </section>
      </main>
    </Layout>
  );
}