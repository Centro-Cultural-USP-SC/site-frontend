import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { api } from "../services/api";

import type {
  Event,
  Post,
  Artwork,
  ArtworkCategory
} from "../types/content";

export default function Dashboard() {
  const [tab, setTab] = useState<
    "EXPOSICAO" |
    "ACERVO" |
    "EVENT"
  >("EXPOSICAO");

const [posts,setPosts] = useState<Post[]>([]);
const [events,setEvents] = useState<Event[]>([]);
const [artworks,setArtworks] = useState<Artwork[]>([]);
const [artworkCategories, setArtworkCategories] = useState<ArtworkCategory[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const [editingPostId, setEditingPostId] = useState<number | null>(null);
const [editingEventId, setEditingEventId] = useState<number | null>(null);
const [editingArtworkId, setEditingArtworkId] = useState<number | null>(null);

const [title, setTitle] = useState("");
const [slug, setSlug] = useState("");
const [summary, setSummary] = useState("");
const [content, setContent] = useState("");
// Campos do acervo
const [registrationNumber, setRegistrationNumber] = useState("");
const [patrimonyNumber, setPatrimonyNumber] = useState("");
const [chronology, setChronology] = useState("");
const [authorship, setAuthorship] = useState("");
const [technique, setTechnique] = useState("");
const [dimensions, setDimensions] = useState("");
const [responsible, setResponsible] = useState("");
const [physicalLocation, setPhysicalLocation] = useState(""); 
const [conservationState, setConservationState] = useState("");
const [internalNotes, setInternalNotes] = useState("");
const [authorBiography, setAuthorBiography] = useState("");
const [artworkCategoryId, setArtworkCategoryId] = useState<number | null>(null);

const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [coverImage, setCoverImage] = useState("");  
const [selectedFile, setSelectedFile] = useState<File | null>(null);

async function loadData() {
  try {
    const [ postsRes, eventsRes, artworksRes, categoriesRes]= await Promise.all([
      api.get("/posts"),
      api.get("/events"),
      api.get("/artworks"),
      api.get("/artwork-categories")
    ]);
  setPosts(postsRes.data);
  setEvents(eventsRes.data);
  setArtworks(artworksRes.data);
  setArtworkCategories(categoriesRes.data)
  }
  finally {
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
      await api.post( "/upload", formData, {
          headers: {
            "Content-Type":
            "multipart/form-data",
          },
        }
      );

    return response.data.imageUrl;
  }

async function handleSubmit(){
  try{
  let imageUrl = coverImage;

  if(selectedFile){
  imageUrl = await uploadImage();
  }

  if (tab === "EVENT") {

  if (editingEventId) {

    await api.put(`/events/${editingEventId}`, {
      title,
      description,
      location,
      coverImage: imageUrl,
      startDate,
      endDate,
      published: true,
    });

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

}
else if (tab === "EXPOSICAO") {

  if (editingPostId) {

    await api.put(`/posts/${editingPostId}`, {
      title,
      slug,
      summary,
      content,
      category: "EXPOSICAO",
      coverImage: imageUrl,
      published: true,
    });

  } else {

    await api.post("/posts", {
      title,
      slug,
      summary,
      content,
      category: "EXPOSICAO",
      coverImage: imageUrl,
      published: true,
    });

  }

}
else if (tab === "ACERVO") {

  if (!artworkCategoryId) {
    alert("Selecione uma categoria");
    return;
  }

  if (editingArtworkId) {

    await api.put(`/artworks/${editingArtworkId}`, {
      title,
      slug,
      categoryId: artworkCategoryId,
      registrationNumber,
      patrimonyNumber,
      chronology,
      authorship,
      technique,
      dimensions,
      description,
      responsible,
      physicalLocation,
      conservationState,
      internalNotes,
      authorBiography,
      coverImage: imageUrl,
    });

  } else {

    await api.post("/artworks", {
      title,
      slug,
      categoryId: artworkCategoryId,
      registrationNumber,
      patrimonyNumber,
      chronology,
      authorship,
      technique,
      dimensions,
      description,
      responsible,
      physicalLocation,
      conservationState,
      internalNotes,
      authorBiography,
      coverImage: imageUrl,
    });

  }

}

  resetForm();
  loadData();

  }catch(error){
  console.error(error);
  alert("Erro ao salvar");
  }
}

  function resetForm() {

    setEditingArtworkId(null);
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
    setRegistrationNumber("");
    setPatrimonyNumber("");
    setChronology("");
    setAuthorship("");
    setTechnique("");
    setDimensions("");
    setResponsible("");
    setPhysicalLocation("");
    setConservationState("");
    setInternalNotes("");
    setAuthorBiography("");
    setArtworkCategoryId(null);
  }

  async function deleteArtwork(id:number){

    if(!window.confirm("Deseja excluir esta obra?")){
    return;
    }
    await api.delete(`/artworks/${id}`);
    loadData();
    }

function editArtwork(artwork:Artwork){

setEditingPostId(null);
setEditingEventId(null);
setEditingArtworkId(artwork.id);
 setTitle(artwork.title);
 setSlug(artwork.slug);
 setRegistrationNumber(artwork.registrationNumber || "");
 setPatrimonyNumber(artwork.patrimonyNumber || "");
 setTechnique(artwork.technique || "");
 setAuthorship(artwork.authorship || "");
 setCoverImage(artwork.coverImage || "");
setArtworkCategoryId(artwork.category?.id || null);
setChronology(artwork.chronology || "");
setDimensions(artwork.dimensions || "");
setDescription(artwork.description || "");
setResponsible(artwork.responsible || "");
setPhysicalLocation(artwork.physicalLocation || "");
setConservationState(artwork.conservationState || "");
setInternalNotes(artwork.internalNotes || "");
setAuthorBiography(artwork.authorBiography || "");
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

const filteredArtworks = artworks
.filter(a =>
  (
    a.title +
    " " +
    (a.description || "")
  )
  .toLowerCase()
  .includes(search.toLowerCase())
);

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
        : tab === "ACERVO"
          ? filteredArtworks
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
            {editingPostId || editingEventId || editingArtworkId
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

{tab === "EXPOSICAO" && (
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

  </>
)}


{tab === "ACERVO" && (
  <>

    <input
      placeholder="Número de registro"
      value={registrationNumber}
      onChange={(e) =>
        setRegistrationNumber(e.target.value)
      }
    />


    <input
      placeholder="Número de patrimônio"
      value={patrimonyNumber}
      onChange={(e) =>
        setPatrimonyNumber(e.target.value)
      }
    />


    <input
      placeholder="Slug"
      value={slug}
      onChange={(e) =>
        setSlug(e.target.value)
      }
    />


    <input
      placeholder="Cronologia"
      value={chronology}
      onChange={(e) =>
        setChronology(e.target.value)
      }
    />


    <input
      placeholder="Autoria"
      value={authorship}
      onChange={(e) =>
        setAuthorship(e.target.value)
      }
    />


    <input
      placeholder="Técnica / Material"
      value={technique}
      onChange={(e) =>
        setTechnique(e.target.value)
      }
    />


    <input
      placeholder="Dimensões"
      value={dimensions}
      onChange={(e) =>
        setDimensions(e.target.value)
      }
    />


    <textarea
      placeholder="Descrição da obra"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
    />


    <input
      placeholder="Responsável"
      value={responsible}
      onChange={(e) =>
        setResponsible(e.target.value)
      }
    />


    <input
      placeholder="Localização física"
      value={physicalLocation}
      onChange={(e) =>
        setPhysicalLocation(e.target.value)
      }
    />


    <input
      placeholder="Estado de conservação"
      value={conservationState}
      onChange={(e) =>
        setConservationState(e.target.value)
      }
    />


    <textarea
      placeholder="Outras considerações internas"
      value={internalNotes}
      onChange={(e) =>
        setInternalNotes(e.target.value)
      }
    />


    <textarea
      placeholder="Sobre o autor"
      value={authorBiography}
      onChange={(e) =>
        setAuthorBiography(e.target.value)
      }
    />


    <select
      value={artworkCategoryId ?? ""}
      onChange={(e) =>
        setArtworkCategoryId(
          Number(e.target.value)
        )
      }
    >

      <option value="">
        Selecione uma categoria
      </option>


      {artworkCategories.map(category => (

        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
        </option>

      ))}


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
            editingPostId || editingEventId || editingArtworkId
              ? "Atualizar"
              : "Criar"
          }
        </button>

        {(editingPostId || editingEventId || editingArtworkId) && (
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

                {tab === "ACERVO" ? (
                  <>
                    <th>Categoria</th>
                    <th>Registro</th>
                  </>
                ) : (
                  <th>
                    {tab === "EVENT"
                      ? "Data"
                      : "Resumo"}
                  </th>
                )}

                <th>Ações</th>

              </tr>

            </thead>

            <tbody>

              {paginatedData.map((item) => {

                if (tab === "ACERVO") {
                  const artwork = item as Artwork;

                  return (
                    <tr key={artwork.id}>

                      <td>
                        <img
                          className="dashboard-thumb"
                          src={
                            artwork.coverImage
                              ? `http://localhost:3000${artwork.coverImage}`
                              : "https://picsum.photos/80"
                          }
                          alt={artwork.title}
                        />
                      </td>

                      <td>{artwork.title}</td>

                      <td>{artwork.category?.name || "-"}</td>

                      <td>{artwork.registrationNumber || "-"}</td>

                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => editArtwork(artwork)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteArtwork(artwork.id)}
                        >
                          Excluir
                        </button>
                      </td>

                    </tr>
                  );
                }

                if (tab === "EVENT") {
                  const event = item as Event;

                  return (
                    <tr key={event.id}>

                      <td>
                        <img
                          className="dashboard-thumb"
                          src={
                            event.coverImage
                              ? `http://localhost:3000${event.coverImage}`
                              : "https://picsum.photos/80"
                          }
                          alt={event.title}
                        />
                      </td>

                      <td>{event.title}</td>

                      <td>
                        {new Date(event.startDate).toLocaleDateString("pt-BR")}
                      </td>

                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => editEvent(event)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deleteEvent(event.id)}
                        >
                          Excluir
                        </button>
                      </td>

                    </tr>
                  );
                }

                const post = item as Post;

                return (
                  <tr key={post.id}>

                    <td>
                      <img
                        className="dashboard-thumb"
                        src={
                          post.coverImage
                            ? `http://localhost:3000${post.coverImage}`
                            : "https://picsum.photos/80"
                        }
                        alt={post.title}
                      />
                    </td>

                    <td>{post.title}</td>

                    <td>{post.summary}</td>

                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => editPost(post)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deletePost(post.id)}
                      >
                        Excluir
                      </button>
                    </td>

                  </tr>
                );

              })}

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