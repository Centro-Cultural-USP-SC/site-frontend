import { Link } from "react-router-dom";

type Props = {
  title: string;
  summary?: string;
  image?: string;
  slug?: string;
};

export default function PostCard({
  title,
  summary,
  image,
  slug,
}: Props) {

  const content = (
    <>
      <div className="post-card-image">
        <img
            src={
              image
                ? `http://localhost:3000${image}`
                : "https://picsum.photos/600/400"
            }
          alt={title}
        />
      </div>

      <div className="post-card-content">
        <h3>{title}</h3>

        {summary && (
          <p>{summary}</p>
        )}
      </div>
    </>
  );

  if (!slug) {
    return (
      <article className="post-card">
        {content}
      </article>
    );
  }

  return (
    <Link
      to={`/post/${slug}`}
      className="post-card"
    >
      {content}
    </Link>
  );
}