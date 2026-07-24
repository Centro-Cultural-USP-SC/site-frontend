import { Link } from "react-router-dom";

type Props = {
  title: string;
  breadcrumb?: {
    nome: string;
    rota: string;
  }[];
};

export default function PageHeader({
  title,
  breadcrumb,
}: Props) {
  return (
    <section className="page-header">
      <div className="container">

        <h1>{title}</h1>

        {breadcrumb && (
          <nav className="breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={item.nome}>
                <Link to={item.rota}>
                  {item.nome}
                </Link>

                {index < breadcrumb.length - 1 && " / "}
              </span>
            ))}
          </nav>
        )}

      </div>
    </section>
  );
}