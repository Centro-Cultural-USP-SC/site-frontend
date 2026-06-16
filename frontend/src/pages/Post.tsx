import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

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

  if (!post) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}