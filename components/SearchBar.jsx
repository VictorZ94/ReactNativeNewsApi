// @packages
import React from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";

const SearchBar = ({
  clicked = true,
  searchNews,
  setSearchNews,
  setClicked,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={clicked ? styles.searchBarClicked : styles.searchBarUnclicked}
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Bitcoin, AI, Microsoft..."
          value={searchNews}
          onChangeText={setSearchNews}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            onPress={() => {
              setSearchNews("");
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBarUnclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBarClicked: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
});

SearchBar.propTypes = {
  clicked: PropTypes.bool,
  searchNews: PropTypes.string,
  setSearchNews: PropTypes.func,
  setClicked: PropTypes.func,
};
