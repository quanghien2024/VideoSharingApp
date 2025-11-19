import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar, // ✅ thêm dòng này
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 👉 Import hình local
import photo1 from "../image/searchphoto1.png";
import photo2 from "../image/searchphoto2.png";
import photo3 from "../image/searchphoto3.png";
import photo4 from "../image/searchphoto4.png";

import laura from "../image/Laura.png";
import liz from "../image/Liz.png";
import cris from "../image/Cris.png";
import lina from "../image/Lina.png";

export default function SearchVideo() {
  const data = [
    { id: 1, title: "Eiusmod Lorem aliquip exercitation", user: "Laura", image: photo1, avatar: laura },
    { id: 2, title: "Reprehenderit ad fugiat nulla mollit", user: "Liz", image: photo2, avatar: liz },
    { id: 3, title: "Consectetur est aliquip adipisicing", user: "Cris", image: photo3, avatar: cris },
    { id: 4, title: "Aute adipisicing ea in nostrud sunt", user: "Lina", image: photo4, avatar: lina },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]}
      contentContainerStyle={{ paddingBottom: 40 }} // ✅ thêm padding để không bị cắt nội dung cuối
    >
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={22} color="#999" />
        <TextInput style={styles.input} placeholder="Pet" />
        <Ionicons name="filter-outline" size={22} color="#999" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Trending", "Accounts", "Streaming", "Audio"].map((t, i) => (
          <TouchableOpacity key={i} style={i === 0 ? styles.activeTab : styles.tab}>
            <Text style={i === 0 ? styles.activeText : styles.tabText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Video grid */}
      <View style={styles.grid}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.userRow}>
              <Image source={item.avatar} style={styles.avatar} />
              <Text style={styles.user}>{item.user}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.showMore}>
        <Text style={{ color: "#ff4081", fontWeight: "600" }}>Show more ↓</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Maybe you're interested</Text>
      <View style={styles.tags}>
        {["Funny moments of pet", "Cats", "Dogs", "Foods for pet", "Vet center"].map((tag, i) => (
          <View key={i} style={styles.tag}>
            <Text style={{ color: "#555" }}>{tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  searchBar: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: { flex: 1, marginHorizontal: 8 },

  tabs: { flexDirection: "row", marginVertical: 16 },
  tab: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f4f4f4",
  },
  activeTab: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#ff4081",
  },
  tabText: { color: "#333" },
  activeText: { color: "#fff", fontWeight: "600" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
  },

  title: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
    color: "#222",
    lineHeight: 22,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  user: {
    color: "#555",
    fontSize: 13.5,
  },

  showMore: { alignItems: "center", marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 10 },
  tags: { flexDirection: "row", flexWrap: "wrap" },
  tag: {
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    margin: 4,
  },
});



