import { Link } from "react-router-dom";

type Props = {
  title: string;
  authorship?: string;
  image?: string;
  slug: string;
};

export default function ObraCard({ title, authorship, image, slug }: Props) {
  return (
    <Link to={`/acervo/obra/${slug}`} className="obra-card">
      <div className="obra-card-image">
        {image && (
          <img
            src={`http://localhost:3000${image}`}
            alt={title}
          />
        )}
      </div>

      <div className="obra-card-content">
        <h3>{title}</h3>
        {authorship && <p>{authorship}</p>}
      </div>
    </Link>
  );
}