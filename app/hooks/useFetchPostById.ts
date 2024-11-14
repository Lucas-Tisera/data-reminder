import { useState, useEffect } from "react";
import { getPostById } from "../services/posts";
import { Post } from "../types/post";

const useFetchPostById = (id: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostById(id);
        setPost(data || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const transformPost = post
    ? {
        ...post,
        created_at: new Date(post.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }
    : null;
  return { post: transformPost, loading, error };
};

export { useFetchPostById };