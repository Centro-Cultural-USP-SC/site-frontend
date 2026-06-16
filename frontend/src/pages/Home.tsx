import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await api.get("/posts");
      setPosts(res.data);
    }

    loadPosts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Centro Cultural</h1>

      <p>Últimos posts</p>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 15 }}>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>

          <Link to={`/post/${post.slug}`}>
            Ler mais
          </Link>
        </div>
      ))}
    </div>
  );
}