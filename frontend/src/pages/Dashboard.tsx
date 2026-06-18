import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { api } from "../services/api";

import type {
  Event,
  Post,
  PostCategory,
} from "../types/content";

export default function Dashboard() {
  const [tab, setTab] = useState<
    "EXPOSICAO" |
    "ACERVO" |
    "EVENT"
  >("EXPOSICAO");

  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  const [editingPostId, setEditingPostId] =
    useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [category, setCategory] =
    useState<PostCategory>("EXPOSICAO");

  const [description, setDescription] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [coverImage, setCoverImage] =
    useState("");
  
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  async function loadData() {
    try {
      const [postsRes, eventsRes] =
        await Promise.all([
          api.get("/posts"),
          api.get("/events"),
        ]);

      setPosts(postsRes.data);
      setEvents(eventsRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function uploadImage() {

    if (!selectedFile) {
      return "";
    }

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    const response =
      await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data.imageUrl;
  }

  async function handleSubmit() {
    try {
      
      let imageUrl = coverImage;

      if (selectedFile) {
        imageUrl =
          await uploadImage();
      }

      if (tab === "EVENT") {

        await api.post("/events", {
          title,
          description,
          location,
          coverImage: imageUrl,
          startDate,
          endDate,
          published: true,
        });

      } else {

        if (editingPostId) {

          await api.put(
            `/posts/${editingPostId}`,
            {
              title,
              slug,
              summary,
              content,
              category,
              coverImage: imageUrl,
              published: true,
            }
          );

        } else {
          console.log({
            title,
            slug,
            summary,
            content,
            category,
            published: true,
          });
          await api.post("/posts", {
            title,
            slug,
            summary,
            content,
            category,
            coverImage: imageUrl,
            published: true,
          });

        }

      }

      resetForm();

      loadData();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar");
    }
  }

  function resetForm() {

    setEditingPostId(null);

    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");

    setDescription("");
    setLocation("");

    setStartDate("");
    setEndDate("");
  }

  async function deletePost(id: number) {
    await api.delete(`/posts/${id}`);
    loadData();
  }

  function editPost(post: Post) {

    setEditingPostId(post.id);

    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary || "");
    setContent(post.content);

    setCategory(post.category);

    setCoverImage(
      post.coverImage || ""
    );
  }

  async function deleteEvent(id: number) {
    await api.delete(`/events/${id}`);
    loadData();
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Layout>

      <main className="container dashboard">

        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-tabs">

          <button
            onClick={() =>
              setTab("EXPOSICAO")
            }
          >
            Exposições
          </button>

          <button
            onClick={() =>
              setTab("ACERVO")
            }
          >
            Acervo
          </button>

          <button
            onClick={() =>
              setTab("EVENT")
            }
          >
            Programação
          </button>

        </div>

        <div className="dashboard-form">

          <input
            placeholder="Título"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSelectedFile(
                e.target.files?.[0] || null
              )
            }
          />

          {tab !== "EVENT" && (
            <>
              <input
                placeholder="Slug"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
              />

              <input
                placeholder="Resumo"
                value={summary}
                onChange={(e) =>
                  setSummary(e.target.value)
                }
              />

              <textarea
                placeholder="Conteúdo"
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target
                      .value as PostCategory
                  )
                }
              >
                <option value="EXPOSICAO">
                  Exposição
                </option>

                <option value="ACERVO">
                  Acervo
                </option>

              </select>
            </>
          )}

          {tab === "EVENT" && (
            <>
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Local"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
              />

              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Imagem"
                value={coverImage}
                onChange={(e) =>
                  setCoverImage(e.target.value)
                }
              />
            </>
          )}

          <button onClick={handleSubmit}>
            Salvar
          </button>

        </div>

        <div className="dashboard-list">

          {tab === "EVENT"
            ? events.map(event => (
                <div
                  key={event.id}
                  className="dashboard-item"
                >
                  <h3>{event.title}</h3>

                  <p>
                    {event.description}
                  </p>

                  <button
                    onClick={() =>
                      deleteEvent(
                        event.id
                      )
                    }
                  >
                    Excluir
                  </button>
                </div>
              ))

            : posts
                .filter(
                  p =>
                    p.category ===
                    tab
                )
                .map(post => (
                  <div
                    key={post.id}
                    className="dashboard-item"
                  >
                    <h3>
                      {post.title}
                    </h3>

                    <p>
                      {post.summary}
                    </p>

                    <button
                      onClick={() =>
                        deletePost(
                          post.id
                        )
                      }
                    >
                      Excluir
                    </button>

                    <button
                      onClick={() => editPost(post)}
                    >
                      Editar
                    </button>
                  </div>
                ))
          }

        </div>

      </main>

    </Layout>
  );
}