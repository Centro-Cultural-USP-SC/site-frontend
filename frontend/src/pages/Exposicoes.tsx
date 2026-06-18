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

export default function Exposicoes() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await api.get("/posts/exposicoes");
      setPosts(res.data);
    }

    loadPosts();
  }, []);

  return (
    <Layout>
      <PageHeader title="Exposições" />

      <Container>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              summary={post.summary}
              slug={post.slug}
              image={post.coverImage}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
}