import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import PostCard from "../components/PostCard";

import { api } from "../services/api";

type Event = {
  id: number;
  title: string;
  summary?: string;
  coverImage?: string;
};

export default function Programacao() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await api.get("/events");
      setEvents(res.data);
    }

    loadPosts();
  }, []);

  return (
    <Layout>
      <PageHeader title="Programação Cultural" />

      <Container>
        <div className="post-grid">
          {events.map((event) => (
            <PostCard
              key={event.id}
              title={event.title}
              summary={event.summary}
              image={event.coverImage}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
}