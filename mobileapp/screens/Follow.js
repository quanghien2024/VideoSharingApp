// screens/Follow.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import kiranGlaucus from "../image/KiranGlaucus.png";
import laura from "../image/Laura.png";
import marieFranco from "../image/MarieFranco.png";
import jenaNguyen from "../image/JenaNguyen.png";
import kristinWatson from "../image/KristinWatson.png";
import bobbySandoval from "../image/BobbySandoval.png";
import jenniePonce from "../image/JenniePonce.png";
import AnjaOConnor from "../image/AnjaOConnor.png";
import avatar from "../image/avatarpro.png";

export default function Follow({ navigation }) {
  const [activeTab, setActiveTab] = useState("following");

  const followingList = [
    { id: 1, name: "Kiran Glaucus", image: kiranGlaucus, following: true },
    { id: 2, name: "Laura", image: laura, following: true },
    { id: 3, name: "Marie Franco", image: marieFranco, following: true },
    { id: 4, name: "Jena Nguyen", image: jenaNguyen, following: true },
    { id: 5, name: "Kristin Watson", image: kristinWatson, following: true },
  ];

  const suggestionList = [
    { id: 6, name: "Bobby Sandoval", image: bobbySandoval, following: false },
    { id: 7, name: "Jennie Ponce", image: jenniePonce, following: false },
    { id: 8, name: "Anja O’Connor", image: AnjaOConnor, following: false },
  ];

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userRow}
      onPress={() =>
        item.name === "Kiran Glaucus"
          ? navigation.navigate("ProfileDetails", { user: item })
          : null
      } // ✅ chỉ Kiran Glaucus mới mở trang chi tiết
    >
      <View style={styles.userLeft}>
        <Image source={item.image} style={styles.avatarSmall} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <TouchableOpacity
        style={[styles.followButton, item.following && styles.followingBtn]}
      >
        <Text
          style={[
            styles.followText,
            item.following && styles.followingText,
          ]}
        >
          {item.following ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
      <Feather name="more-vertical" size={18} color="#444" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View
        style={[
          styles.container,
          Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#222" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Image source={avatar} style={styles.avatarHeader} />
            <Text style={styles.headerName}>Ruth Sanders</Text>
          </View>

          <View style={styles.headerIcons}>
            <Feather name="search" size={22} color="#444" />
            <Ionicons
              name="menu-outline"
              size={26}
              color="#444"
              style={{ marginLeft: 14 }}
            />
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab("followers")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "followers" && styles.tabActive,
              ]}
            >
              368 followers
            </Text>
            {activeTab === "followers" && <View style={styles.activeLine} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("following")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "following" && styles.tabActive,
              ]}
            >
              456 following
            </Text>
            {activeTab === "following" && <View style={styles.activeLine} />}
          </TouchableOpacity>
        </View>

        <FlatList
          data={followingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <Text style={styles.suggestionTitle}>Suggestions for you</Text>
        <FlatList
          data={suggestionList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerCenter: { flexDirection: "row", alignItems: "center", flex: 1, marginLeft: 12 },
  avatarHeader: { width: 42, height: 42, borderRadius: 21 },
  headerName: { marginLeft: 10, fontWeight: "800", fontSize: 18, color: "#222" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabText: { color: "#999", fontSize: 14, fontWeight: "500", paddingBottom: 8 },
  tabActive: { color: "#FF4081", fontWeight: "700" },
  activeLine: { height: 3, backgroundColor: "#FF4081", borderRadius: 2, marginTop: -2 },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  userLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatarSmall: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  userName: { fontSize: 15, fontWeight: "500", color: "#222" },
  followButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  followText: { color: "#fff", fontWeight: "600" },
  followingBtn: { backgroundColor: "#f4f4f4" },
  followingText: { color: "#555" },
  suggestionTitle: {
    marginTop: 16,
    marginBottom: 6,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
});

