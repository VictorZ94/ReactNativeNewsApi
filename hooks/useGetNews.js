import { useInfiniteQuery } from "@tanstack/react-query";
import { API_KEY_NEWS } from "@env";
import axios from "axios";

const useGetNews = (searchTopic, setTotalResult) => {
  // const params = new URLSearchParams({ q: searchTopic }).toString();
  const fetchNews = async ({ pageParam = 1 }) => {
    try {
      const { data } = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: searchTopic === "" ? "bitcoin" : searchTopic,
          page: pageParam,
          pageSize: 20,
          apiKey: API_KEY_NEWS,
        },
      });
      setTotalResult(data?.totalResults);
      return data?.articles;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return useInfiniteQuery({
    queryKey: ["fetchNews", searchTopic],
    queryFn: fetchNews,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useGetNews;
