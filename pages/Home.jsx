// @packages
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { useCallback, useState } from "react";
import uuid from "react-native-uuid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

// @components
import CardNews from "../components/CardNews";
import EmptySearch from "../components/EmptySearch";

// @query
import getNews from "../services/getNews";
import useSearch from "../hooks/useSearch";

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const { search, setSearch, error } = useSearch();
  const [searchTopic] = useDebounce(search, 1000);
  const { data, hasNextPage, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["getNews", searchTopic],
      queryFn: ({ pageParam = 1 }) => getNews(searchTopic, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.length === 0) return undefined;
        return allPages.length + 1;
      },
    });
  const infinityData = data?.pages?.map((page) => page).flat();

  const handleOnReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(({ item }) => <CardNews {...item} />, []);

  return (
    <>
      <View>
        <SearchBar
          searchNews={search}
          setSearchNews={setSearch}
          setClicked={setClicked}
          clicked={clicked}
        />
        {error && (
          <View>
            <Text
              style={{
                color: "red",
                fontSize: 12,
                fontStyle: "italic",
                paddingLeft: 18,
              }}
            >
              {error}
            </Text>
          </View>
        )}
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleHighlight}>Latest News</Text>
            <Text>Results: {infinityData?.length || 0}</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator animating={true} size="large" />
          ) : (
            <FlatList
              data={infinityData}
              renderItem={renderItem}
              keyExtractor={() => uuid.v4()}
              numColumns={2}
              onEndReached={handleOnReachEnd}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={() => {
                isFetchingNextPage ? (
                  <ActivityIndicator animating={true} size="large" />
                ) : (
                  <EmptySearch />
                );
              }}
            />
            // <VirtualizedList
            //   getItem={infinityData}
            //   renderItem={({ item }) => <CardNews {...item} />}
            //   getItemCount={}
            // />
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 25,
    marginBottom: 10,
  },
  headerTitleHighlight: {
    fontSize: 28,
    fontWeight: "800",
  },
});
