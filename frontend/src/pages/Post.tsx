import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../services/api";

import Layout from "../components/Layout";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";

export default function Post() {
  const { slug } = useParams();

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    async function loadPost() {
      const res = await api.get(`/posts/${slug}`);
      setPost(res.data);
    }

    loadPost();
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <Container>
          <p>Carregando...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title={post.title} />

      <Container>
        <article className="post-content">
          {post.summary && (
            <p className="post-summary">
              {post.summary}
            </p>
          )}

          <div className="post-cover">
            <img
              src={
                post.coverImage
                  ? `http://localhost:3000${post.coverImage}`
                  : "https://picsum.photos/1400/700"
              }
              alt={post.title}
            />
          </div>

          <div className="post-body">
            {post.content}
          </div>
        </article>
      </Container>
    </Layout>
  );
}