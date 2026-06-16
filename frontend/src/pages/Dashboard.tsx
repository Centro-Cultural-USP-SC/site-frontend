import { useEffect, useState } from "react";
import { api } from "../services/api";

type Post = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  published: boolean;
};

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

    async function handleDelete(id: number) {
        try {
            await api.delete(`/posts/${id}`);
            loadPosts();
        } catch (err) {
            console.error("Erro ao deletar", err);
            alert("Erro ao deletar post");
        }
    }
    function handleEdit(post: any) {
        setEditingPostId(post.id);
        setTitle(post.title);
        setSlug(post.slug);
        setSummary(post.summary || "");
        setContent(post.content);
    }

  async function loadPosts() {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

    async function handleSubmit() {
    try {
        if (editingPostId) {
        await api.put(`/posts/${editingPostId}`, {
            title,
            slug,
            summary,
            content,
            published: true,
        });
        } else {
        await api.post("/posts", {
            title,
            slug,
            summary,
            content,
            published: true,
        });
        }

        setTitle("");
        setSlug("");
        setSummary("");
        setContent("");
        setEditingPostId(null);

        loadPosts();
    } catch (err) {
        console.error(err);
        alert("Erro ao salvar post");
    }
    }

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {/* FORMULÁRIO DE CRIAÇÃO */}
      <div style={{ marginBottom: 30, padding: 10, border: "1px solid #ccc" }}>
        <h2>Criar Post</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <br />

        <input
          placeholder="Resumo"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <br />

        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />

        <button onClick={handleSubmit}>
            {editingPostId ? "Atualizar Post" : "Criar Post"}
        </button>
      </div>

      {/* LISTA DE POSTS */}
      <div>
        <h2>Posts</h2>

        {posts.length === 0 ? (
          <p>Nenhum post</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10 }}>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <small>{post.slug}</small>

                <div style={{ marginTop: 10 }}>
                <button onClick={() => handleDelete(post.id)}>
                    🗑 Delete
                </button>

                <button onClick={() => handleEdit(post)}>
                    ✏️ Edit
                </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}