import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import painting from "../assets/images/painting1.jpeg";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../assets/colors/colors";

const OnBoardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.intoWrapper}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.title}>SFUMATO</Text>
      </View>
      <Image source={painting} style={styles.logo} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.proceedWrapper}
      >
        <Text style={styles.proceedText}>Proceed</Text>
        <Entypo name="chevron-right" size={32} color={colors.green} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark2,
    marginTop: 20,
  },
  intoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontFamily: "Cera-Bold",
    fontSize: 16,
  },
  title: {
    color: colors.cyan,
    fontFamily: "Cera-Bold",
    fontSize: 32,
    marginTop: 20,
  },
  proceedWrapper: {
    backgroundColor: colors.white,
    opacity: 1,
    padding: 10,
    paddingHorizontal: 20,
    width: "60%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  proceedText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Cera-Light",
  },

  logo: {
    width: 227.27,
    height: 150,
    borderRadius: 20,
    marginVertical: 20,
  },
});

export default OnBoardingScreen;
