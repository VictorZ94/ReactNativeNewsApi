// @packages
import { FlatList, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import uuid from "react-native-uuid";

// @components
import CardNews from "../components/CardNews";
import EmptySearch from "../components/EmptySearch";

// @query
import useGetNews from "../hooks/useGetNews";

const Home = () => {
  const [searchNewKeyword, setSearchNewKeyword] = useState("");
  const [clicked, setClicked] = useState(false);
  const { data } = useGetNews();
  const infinityData = data?.pages?.map((page) => page).flat();

  return (
    <>
      <View>
        <SearchBar
          searchNews={searchNewKeyword}
          setSearchNews={setSearchNewKeyword}
          setClicked={setClicked}
          clicked={clicked}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleHighlight}>Latest News</Text>
          <Text>Results: {infinityData?.length || 0}</Text>
        </View>
        <FlatList
          data={infinityData}
          renderItem={({ item }) => <CardNews {...item} />}
          keyExtractor={() => uuid.v4()}
          numColumns={2}
          ListEmptyComponent={() => <EmptySearch />}
        />
      </View>
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
