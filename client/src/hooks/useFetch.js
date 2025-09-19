import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(endpoint) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/${endpoint}`
        );
        setData(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
