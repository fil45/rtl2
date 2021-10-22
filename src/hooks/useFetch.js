import { useState, useEffect, useCallback } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = useCallback(() => {
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed while getting data");
        }
        return res.json();
      })
      .catch((e) => {
        throw new Error("Failed while getting data");
      })
      .then((json) => {
        setData(json);
        setError("");
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [endpoint]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
};

export default useFetch;
