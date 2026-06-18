import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import PostCard from "../components/PostCard";

import { api } from "../services/api";

type Post = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  coverImage?: string;
};

export default function Acervo() {

  const [items, setItems] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadAcervo() {

      try {

        const response =
          await api.get(
            "/posts/acervo"
          );

        setItems(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadAcervo();

  }, []);

  return (
    <Layout>

      <PageHeader
        title="Acervo Artístico"
      />

      <Container>

        {loading ? (

          <p>Carregando...</p>

        ) : items.length === 0 ? (

          <div className="empty-state">

            <h3>
              Nenhum item cadastrado
            </h3>

          </div>

        ) : (

          <div className="post-grid">

            {items.map((item) => (

              <PostCard
                key={item.id}
                title={item.title}
                summary={item.summary}
                slug={item.slug}
                image={item.coverImage}
              />

            ))}

          </div>

        )}

      </Container>

    </Layout>
  );
}