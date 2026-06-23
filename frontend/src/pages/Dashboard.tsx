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

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  const [editingPostId, setEditingPostId] =
    useState<number | null>(null);
  
  const [editingEventId, setEditingEventId] =
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

        if (editingEventId) {

          await api.put(
            `/events/${editingEventId}`,
            {
              title,
              description,
              location,
              coverImage: imageUrl,
              startDate,
              endDate,
              published: true,
            }
          );

        } else {

          await api.post("/events", {
            title,
            description,
            location,
            coverImage: imageUrl,
            startDate,
            endDate,
            published: true,
          });

        }

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
    setEditingEventId(null);

    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");

    setDescription("");
    setLocation("");

    setStartDate("");
    setEndDate("");

    setCoverImage("");
    setSelectedFile(null);
  }

  async function deletePost(id: number) {

    if (
      !window.confirm(
        "Deseja realmente excluir este post?"
      )
    ) {
      return;
    }

    await api.delete(`/posts/${id}`);

    loadData();
  }

  function editPost(post: Post) {
    setEditingEventId(null);
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

  function editEvent(event: Event) {
    setEditingPostId(null);
    setEditingEventId(event.id);

    setTitle(event.title);
    setDescription(event.description);

    setLocation(event.location || "");

    setStartDate(
      event.startDate.slice(0,16)
    );

    setEndDate(
      event.endDate
        ? event.endDate.slice(0,16)
        : ""
    );

    setCoverImage(
      event.coverImage || ""
    );
  }

  async function deleteEvent(id: number) {

    if (
      !window.confirm(
        "Deseja realmente excluir este evento?"
      )
    ) {
      return;
    }

    await api.delete(`/events/${id}`);

    loadData();
  }

  const filteredPosts = posts
    .filter(p => p.category === tab)
    .filter(p =>
      (
        p.title +
        " " +
        (p.summary || "")
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const filteredEvents = events
    .filter(e =>
      (
        e.title +
        " " +
        e.description
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

    const data =
      tab === "EVENT"
        ? filteredEvents
        : filteredPosts;

    const paginatedData =
      data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

    const totalPages = Math.max(
      1,
      Math.ceil(
        data.length / itemsPerPage
      )
    );

    
    if (loading) {
      return <p>Carregando...</p>;
    }

  return (
    <Layout>

      <main className="container dashboard">

        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-header">
          <h2>
            {editingPostId || editingEventId
              ? "Editando conteúdo"
              : "Novo conteúdo"}
          </h2>
        </div>

        <div className="dashboard-tabs">

          <button
            onClick={() => {
              resetForm();
              setTab("EXPOSICAO");
              setCurrentPage(1);
            }}
          >
            Exposições
          </button>

          <button
            onClick={() => {
              resetForm();
              setTab("ACERVO");
              setCurrentPage(1);
            }}
          >
            Acervo
          </button>

          <button
            onClick={() => {
              resetForm();
              setTab("EVENT")
              setCurrentPage(1);
            }}
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

          {(selectedFile || coverImage) && (
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : `http://localhost:3000${coverImage}`
              }
              alt="Preview"
              className="dashboard-preview"
            />
          )}

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

            </>
          )}

        <button onClick={handleSubmit}>
          {
            editingPostId || editingEventId
              ? "Atualizar"
              : "Criar"
          }
        </button>

        {(editingPostId || editingEventId) && (
          <button
            type="button"
            onClick={resetForm}
          >
            Cancelar
          </button>
        )}

        </div>

          <div className="dashboard-toolbar">

            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            />

          </div>

        <div className="dashboard-table-wrapper">

          <table className="dashboard-table">

            <thead>

              <tr>

                <th>Imagem</th>

                <th>Título</th>

                <th>
                  {tab === "EVENT"
                    ? "Data"
                    : "Resumo"}
                </th>

                <th>Ações</th>

              </tr>

            </thead>

            <tbody>

              {paginatedData.map((item: any) => (

                <tr key={item.id}>

                  <td>

                    <img
                      className="dashboard-thumb"
                      src={
                        item.coverImage
                          ? `http://localhost:3000${item.coverImage}`
                          : "https://picsum.photos/80"
                      }
                      alt={item.title}
                    />

                  </td>

                  <td>
                    {item.title}
                  </td>

                  <td>

                    {tab === "EVENT"
                      ? new Date(
                          item.startDate
                        ).toLocaleDateString(
                          "pt-BR"
                        )
                      : item.summary}

                  </td>

                  <td>
                  <button
                    className="btn-edit"
                    onClick={() =>

                      tab === "EVENT"
                        ? editEvent(item)
                        : editPost(item)

                    }
                  >
                    Editar
                  </button>

                    <button className="btn-delete"
                      onClick={() =>

                        tab === "EVENT"
                          ? deleteEvent(
                              item.id
                            )
                          : deletePost(
                              item.id
                            )

                      }
                    >
                      Excluir
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="pagination">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                p => p - 1
              )
            }
          >
            ←
          </button>

          <span>
            Página {currentPage}
            de {totalPages}
          </span>

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                p => p + 1
              )
            }
          >
            →
          </button>

        </div>

      </main>

    </Layout>
  );
}