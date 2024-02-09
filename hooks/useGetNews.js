import { useInfiniteQuery } from "@tanstack/react-query";
import data from "../data/success.json";
import { API_KEY_NEWS } from "@env";

const useGetNews = () => {
  const fetchNews = async ({ pageParams = 1 }) => {
    try {
      // const { data } = axios.get("https://newsapi.org/v2/everything", {
      //   params: {
      //     q: search,
      //     page: pageParams,
      //     pageSize: 20,
      //     apiKey: API_KEY_NEWS
      //   },
      // });
      return data?.articles;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return useInfiniteQuery({
    queryKey: ["fetchNews"],
    queryFn: fetchNews,
    getNextPageParam: ({ lastPage, allPages }) => {
      if (lastPage?.length === 0) return undefined;
      return allPages?.length + 1;
    },
  });
};

export default useGetNews;
