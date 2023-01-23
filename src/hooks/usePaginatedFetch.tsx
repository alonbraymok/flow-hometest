import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "utils/constans";

let users: any = {};

export default function usePaginatedFetch(url: string) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const usersRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response: any = await fetch(url);
      const data = await response.json();

      for (let i = 0; i < data.length; i++) {
        const post = data[i];
        const currentUser = usersRef?.current?.[post.userId];
        if (!currentUser && post.userId) {
          const user = await fetch(`${BASE_URL}users/${post.userId}`);
          const userData = await user.json();

          users = {
            ...users,
            [post.userId]: userData,
          };
          usersRef.current = users;
        }
      }

      setData(data);
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, users: usersRef.current };
}
