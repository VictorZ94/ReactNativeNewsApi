// @packages
import moment from "moment/moment";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CardNews = ({
  source,
  title,
  urlToImage,
  publishedAt,
  author = "Unknown",
  url,
  content,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            urlToImage !== null ? urlToImage : "https://picsum.photos/200/200",
        }}
        style={styles.image}
      />
      <View style={styles.cardBody}>
        <View style={{ marginVertical: 5 }}>
          <Text numberOfLines={2} style={styles.cardTitle}>
            {title}
          </Text>
          <View style={styles.tagDescription}>
            <Text style={[styles.colorText, styles.smallText]}>
              {moment(publishedAt).format("L")}
            </Text>
            <Text style={[styles.author, styles.smallText]} numberOfLines={1}>
              {author}
            </Text>
          </View>
          <Text numberOfLines={7}>{content}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Text style={styles.readMore}>Read more...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.source}>
          <Text style={styles.smallText}>
            source: {source?.name || "Unknown"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardNews;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f4f6",
    margin: 5,
    flex: 3,
    borderRadius: 8,
  },
  cardBody: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  cardTitle: {
    fontWeight: "700",
    width: "auto",
  },
  tagDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 8,
  },
  smallText: {
    fontStyle: "italic",
    fontSize: 12,
  },
  readMore: {
    color: "blue",
    paddingVertical: 8,
  },
  source: {
    alignItems: "flex-end",
    paddingRight: 8,
  },
  author: {
    color: "#6366f1",
    maxWidth: "50%",
  },
  colorText: {
    color: "#6366f1",
  },
});
