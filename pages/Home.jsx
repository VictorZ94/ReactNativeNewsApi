// @packages
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { useCallback, useState } from "react";
import uuid from "react-native-uuid";
import { useDebounce } from "use-debounce";

// @components
import CardNews from "../components/CardNews";
import EmptySearch from "../components/EmptySearch";

// @query
import useSearch from "../hooks/useSearch";
import useGetNews from "../hooks/useGetNews";

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const { search, setSearch, error } = useSearch();
  const [totalResults, setTotalResult] = useState(0);
  const [searchTopic] = useDebounce(search, 1000);
  const { data, hasNextPage, isLoading, fetchNextPage } = useGetNews(
    searchTopic,
    setTotalResult
  );
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
            <Text>
              Results: {infinityData?.length || 0} of {totalResults}
            </Text>
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
              ListEmptyComponent={() => <EmptySearch />}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 15,
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
