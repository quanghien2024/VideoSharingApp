// screens/MyProfile.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

// ✅ Hình ảnh
import avatarpro from "../image/avatarpro.png";

import pro1 from "../image/pro1.png";
import pro2 from "../image/pro2.png";
import pro3 from "../image/pro3.png";
import pro4 from "../image/pro4.png";
import pro5 from "../image/pro5.png";
import pro6 from "../image/pro6.png";
import pro7 from "../image/pro7.png";
import pro8 from "../image/pro8.png";
import pro9 from "../image/pro9.png";

const { width } = Dimensions.get("window");
const itemWidth = (width - 32) / 3;

const MyProfile = () => {
  const [selectedTab, setSelectedTab] = useState("videos");

  const videos = [
    { id: "1", thumbnail: pro1 },
    { id: "2", thumbnail: pro2 },
    { id: "3", thumbnail: pro3 },
    { id: "4", thumbnail: pro4 },
    { id: "5", thumbnail: pro5 },
    { id: "6", thumbnail: pro6 },
    { id: "7", thumbnail: pro7 },
    { id: "8", thumbnail: pro8 },
    { id: "9", thumbnail: pro9 },
  ];

  const renderVideo = ({ item }) => (
    <View style={styles.videoCard}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={[
          styles.container,
          Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        {/* Hàng trên cùng */}
        <View style={styles.topRow}>
          <View style={styles.leftIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="menu" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 10 }]}>
              <MaterialIcons name="person-add-alt-1" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Nút Edit Profile */}
          <TouchableOpacity style={styles.editProfile}>
            <View style={styles.editCircle}>
              <Feather name="edit-3" size={16} color="#FF4081" />
            </View>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar + tên */}
        <Image source={avatarpro} style={styles.avatar} resizeMode="cover" />
        <Text style={styles.name}>Ruth Sanders</Text>

        {/* Thông tin Follow */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>203</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>628</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2634</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {[
            { id: "videos", label: "My Videos", icon: "play" },
            { id: "images", label: "My Images", icon: "image" },
            { id: "liked", label: "Liked", icon: "heart" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => setSelectedTab(tab.id)}
            >
              <View style={styles.tabContent}>
                <Feather
                  name={tab.icon}
                  size={18}
                  color={selectedTab === tab.id ? "#FF4081" : "#aaa"}
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab.id && styles.tabActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </View>

              {/* Gạch dưới màu hồng */}
              {selectedTab === tab.id && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Grid video */}
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={renderVideo}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
    alignItems: "center",
  },
  leftIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
  },
  editProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  editCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.8,
    borderColor: "#FF4081",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  editText: {
    color: "#FF4081",
    fontWeight: "600",
    fontSize: 13,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 14,
  },
  statItem: { alignItems: "center" },
  statNumber: { fontWeight: "bold", fontSize: 16, color: "#222" },
  statLabel: { color: "#999", fontSize: 12 },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 6,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 13,
    color: "#999",
    marginLeft: 6,
    fontWeight: "500",
  },
  tabActive: {
    color: "#FF4081",
    fontWeight: "700",
  },
  activeLine: {
    marginTop: 5,
    height: 3,
    width: "70%",
    backgroundColor: "#FF4081",
    borderRadius: 2,
  },
  grid: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 40,
  },
  videoCard: {
    width: itemWidth,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  thumbnail: {
    width: "100%",
    height: itemWidth * 1.5,
    borderRadius: 8,
  },
});

export default MyProfile;






