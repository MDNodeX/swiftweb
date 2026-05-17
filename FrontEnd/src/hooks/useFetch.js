import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          ...options,
          credentials: "include", // this sends cookies
        });
        const responseData = await response.json();
        // 🔴 If token expired or unauthorized
        if (response.status === 401) {
          localStorage.removeItem("user");

          alert("Session expired. Please login again.");

          window.location.href = "/sign-in";
          return;
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}, ${response.status}`);
        }
        setData(responseData);
        setError();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, ...dependencies]);

  return { data, loading, error };
};
