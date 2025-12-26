import { useEffect, useState } from "react";

export function useHistory(key = "history") {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(history));
  }, [history, key]);

  const add = (entry) =>
    setHistory((h) => [{ ...entry, id: Date.now() }, ...h]);

  const remove = (id) =>
    setHistory((h) => h.filter((e) => e.id !== id));

  return { history, add, remove };
}
