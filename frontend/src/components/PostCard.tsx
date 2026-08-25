import { Link } from "react-router-dom";

type PostCardProps = {
  title: string;
  summary?: string;
  image?: string;
  slug?: string;
  link?: string; // Adicione esta linha para liberar a prop
};

export default function PostCard({ title, summary, image, slug, link }: PostCardProps) {
  // Define o destino priorizando 'link', com fallback para '/post/:slug'
  const destination = link || (slug ? `/post/${slug}` : "#");

  return (
    <Link to={destination} className="post-card">
      {image && <img src={`http://localhost:3000${image}`} alt={title} />}
      <h3>{title}</h3>
      {summary && <p>{summary}</p>}
    </Link>
  );
}