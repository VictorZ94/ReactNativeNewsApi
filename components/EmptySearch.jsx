// @packages
import { StyleSheet, Text, View } from "react-native";

const EmptySearch = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>There's no news for this search.</Text>
    </View>
  );
};

export default EmptySearch;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#f3f4f6",
  },
});
