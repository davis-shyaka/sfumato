import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import colors from "../assets/colors/colors";
import profile from "../assets/images/gallery/friday.jpg";
import Feather from "react-native-vector-icons/Feather";
import Carousel from "react-native-snap-carousel-v4";
import { freeArt, paidArt, sliderData } from "../model/data";
import BannerSlider from "../components/BannerSlider";
import { windowWidth } from "../utils/Dimensions";
import CustomSwitch from "../components/CustomSwitch";
import { useState } from "react";
import ListItem from "../components/ListItem";

const HomeScreen = ({ navigation }) => {
  const [artTab, setArtTab] = useState(1);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = (value) => {
    setArtTab(value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Welcome back, Beni</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={profile} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Feather
              name="search"
              size={22}
              color={colors.cyan}
              style={styles.searchIcon}
            />
            <TextInput style={styles.searchInput} placeholder="Search..." />
          </View>
        </View>

        {/* Coming Soon Section */}
        <View style={styles.comingSoonWrapper}>
          <View style={styles.comingSoonHeader}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.comingSoonItem}></TouchableOpacity>
          <View style={styles.carousel}>
            <Carousel
              layout={"stack"}
              layoutCardOffset={`18`}
              ref={(c) => {
                // this._carousel = c;
              }}
              data={sliderData}
              renderItem={renderBanner}
              sliderWidth={windowWidth - 40}
              itemWidth={300}
              loop={true}
            />
          </View>
        </View>

        {/* Selection Section */}
        <View>
          <CustomSwitch
            selectionMode={1}
            option1="Free Art"
            option2="Paid Art"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {artTab == 1 &&
          freeArt.map((item) => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
            />
          ))}
        {artTab == 2 &&
          paidArt.map((item) => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark2,
    marginTop: 20,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "Cera-Medium",
    fontSize: 16,
    color: colors.white,
  },

  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  searchWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: "row",
    borderColor: colors.cyan,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchIcon: {
    margin: 10,
  },
  searchInput: {
    color: colors.white,
  },
  comingSoonWrapper: {},
  comingSoonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  comingSoonText: {
    color: colors.yellow,
    fontFamily: "Cera-Regular",
    fontSize: 16,
  },
  comingSoonItem: {},
  seeAllLink: {
    color: colors.cyan,
    fontFamily: "Cera-Medium",
    fontSize: 16,
  },
});

export default HomeScreen;
