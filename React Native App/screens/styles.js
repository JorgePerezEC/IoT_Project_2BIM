import { StyleSheet, Dimensions } from "react-native";

var { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;

const style_Text = StyleSheet.create({
  Title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "25%",
    fontWeight: "bold",
    color: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  TitleDash: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "5%",
    fontWeight: "bold",
    color: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "relative",
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  subt: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: "black",
    shadowColor: "#171717",
  },
  inputText: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    margin: 20,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "blue",
    margin: 20,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
const styles_card = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 5,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
const style_continer = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: Platform.OS === "android" ? -50 : 0,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: box_height,
  },
  box1: {
    flex: 0.5,
    backgroundColor: "#E09302",
    justifyContent: "center",
  },
  box1A: {
    flex: 1,
    backgroundColor: "#E09302",
    justifyContent: "center",
  },
  box2: {
    flex: 1.2,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  box3: {
    flex: 2,
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: 20,
    margin: 10,
  },
});

export { style_Text, styles_card, style_continer };
