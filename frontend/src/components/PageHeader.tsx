type Props = {
  title: string;
};

export default function PageHeader({
  title,
}: Props) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}