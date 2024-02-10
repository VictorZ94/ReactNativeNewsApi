import { useEffect, useRef, useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("Input vacío, noticias por defecto 'Bitcoin'");
      return;
    }

    if (search.length < 3) {
      setError("No se puede buscar una noticia con menos de 3 caracteres.");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
};

export default useSearch;
