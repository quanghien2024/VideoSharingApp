import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import backgroundgirl from "../image/backgroundgirl.png";
import addmusic1 from "../image/addmusic1.png";

import filter1 from "../image/filter1.png";
import filter2 from "../image/filter2.png";
import filter3 from "../image/filter3.png";
import filter4 from "../image/filter4.png";
import filter5 from "../image/filter5.png";
import filter6 from "../image/filter6.png";
import filter7 from "../image/filter7.png";
import filter8 from "../image/filter8.png";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 36;
const GAP = 14;
const ITEM_WIDTH = Math.floor((width - HORIZONTAL_PADDING - GAP * 4) / 5);
const IMAGE_SIZE = Math.floor(ITEM_WIDTH * 0.75);

export default function CreateVideoSelectFilter() {
  const navigation = useNavigation();

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [activeTab, setActiveTab] = useState("For you");

  const allFilters = [
    { id: 1, name: "Film", image: filter1 },
    { id: 2, name: "Black white", image: filter2 },
    { id: 3, name: "Natural", image: filter3 },
    { id: 4, name: "Art", image: filter4 },
    { id: 5, name: "Vintage", image: filter5 },
    { id: 6, name: "Spring", image: filter6 },
    { id: 7, name: "Baby", image: filter7 },
    { id: 8, name: "Contrast", image: filter8 },
  ];

  const getFiltersByTab = () => {
    switch (activeTab) {
      case "Trending":
        return allFilters.filter((f) => [2, 4, 6].includes(f.id));
      case "Saved":
        return allFilters.filter((f) => [2, 3, 7, 8].includes(f.id));
      default:
        return allFilters;
    }
  };

  const currentFilters = getFiltersByTab();
  const filtersRow1 = currentFilters.slice(0, 5);
  const filtersRow2 = currentFilters.slice(5);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundgirl}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

          {/* ✅ Khi bấm Add audio → sang CreateVideoSelectMusic */}
          <TouchableOpacity
            style={styles.centerHeader}
            onPress={() => navigation.navigate("CreateVideoSelectMusic")}
          >
            <Image
              source={addmusic1}
              style={styles.audioImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Side tools */}
        <View style={styles.sideTools}>
          <TouchableOpacity style={styles.toolItem}>
            <Ionicons name="camera-reverse-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolItem}>
            <Ionicons name="color-filter-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolItem}>
            <Ionicons name="timer-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolItem}>
            <Ionicons name="flash-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Flash</Text>
          </TouchableOpacity>
        </View>

        {/* Filter bottom panel */}
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Add filter</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={styles.removeFilterButton}
              onPress={() => setSelectedFilter(null)}
            >
              <Ionicons name="ban-outline" size={20} color="#ff4081" />
            </TouchableOpacity>

            {["For you", "Trending", "Saved"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.filterTab,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={
                    activeTab === tab
                      ? styles.activeTabText
                      : styles.filterTabText
                  }
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Grid Filter */}
          <View style={styles.filterGrid}>
            <View style={styles.filterRow}>
              {filtersRow1.map((item, idx) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.filterItem,
                    {
                      width: ITEM_WIDTH,
                      marginRight: idx === filtersRow1.length - 1 ? 0 : GAP,
                    },
                  ]}
                  onPress={() =>
                    setSelectedFilter(
                      selectedFilter === item.name ? null : item.name
                    )
                  }
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.imageWrapper,
                      selectedFilter === item.name &&
                        styles.imageWrapperSelected,
                    ]}
                  >
                    <ImageBackground
                      source={item.image}
                      style={[
                        styles.filterImage,
                        { width: IMAGE_SIZE, height: IMAGE_SIZE },
                      ]}
                      imageStyle={{ borderRadius: 10 }}
                    />
                  </View>
                  <Text
                    style={styles.filterName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {filtersRow2.length > 0 && (
              <View style={[styles.filterRow, styles.secondRow]}>
                {filtersRow2.map((item, idx) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.filterItem,
                      {
                        width: ITEM_WIDTH,
                        marginRight: idx === filtersRow2.length - 1 ? 0 : GAP,
                      },
                    ]}
                    onPress={() =>
                      setSelectedFilter(
                        selectedFilter === item.name ? null : item.name
                      )
                    }
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.imageWrapper,
                        selectedFilter === item.name &&
                          styles.imageWrapperSelected,
                      ]}
                    >
                      <ImageBackground
                        source={item.image}
                        style={[
                          styles.filterImage,
                          { width: IMAGE_SIZE, height: IMAGE_SIZE },
                        ]}
                        imageStyle={{ borderRadius: 10 }}
                      />
                    </View>
                    <Text
                      style={styles.filterName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  background: { flex: 1, width: "100%", height: "100%" },

  topBar: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: { position: "absolute", left: 38, top: 0, zIndex: 2 },
  closeIcon: { color: "#fff", fontSize: 28, fontWeight: "600" },
  centerHeader: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  audioImage: { width: 150, height: 40 },

  sideTools: {
    position: "absolute",
    right: 20,
    top: "24%",
    alignItems: "center",
  },
  toolItem: { alignItems: "center", marginBottom: 25 },
  toolText: { color: "#fff", fontSize: 12, marginTop: 4 },

  filterContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    width: "100%",
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterTitle: { fontSize: 18, fontWeight: "600" },

  filterTabs: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  removeFilterButton: { marginRight: 14, padding: 4 },
  filterTab: {
    marginRight: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  activeTab: { backgroundColor: "#ff4081" },
  filterTabText: { color: "#333" },
  activeTabText: { color: "#fff", fontWeight: "600" },

  filterGrid: { width: "100%" },
  filterRow: { flexDirection: "row", alignItems: "center" },
  secondRow: { marginTop: 12 },
  filterItem: { alignItems: "center" },

  imageWrapper: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    padding: 2,
  },
  imageWrapperSelected: { borderColor: "#00bfff" },
  filterImage: { borderRadius: 10, backgroundColor: "#ddd" },
  filterName: {
    marginTop: 6,
    fontSize: 11,
    color: "#333",
    textAlign: "center",
    width: IMAGE_SIZE + 8,
  },
});


