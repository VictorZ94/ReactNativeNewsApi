import { useInfiniteQuery } from "@tanstack/react-query";
import data from "../data/success.json";
import { API_KEY_NEWS } from "@env";
import axios from "axios";

const getNews = async (search, pageParam = 1) => {
  // console.log("I'm looking for", search);
  try {
    const { data } = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: search === "" ? "bitcoin" : search,
        page: pageParam,
        pageSize: 20,
        apiKey: API_KEY_NEWS,
      },
    });
    return data?.articles;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getNews;
