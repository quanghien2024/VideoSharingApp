import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Ảnh mẫu
import kiranGlaucus from "../image/KiranGlaucus.png";
import flaura from "../image/Laura.png";
import bobb from "../image/AnjaOConnor.png";
import kiddy from "../image/KristinWatson.png";
import photo1 from "../image/detail1.png";
import photo2 from "../image/detail2.png";
import photo3 from "../image/detail3.png";
import photo4 from "../image/detail4.png";
import photo5 from "../image/detail5.png";
import photo6 from "../image/detail6.png";

const { width } = Dimensions.get("window");

export default function ProfileDetails({ navigation, route }) {
  const { user } = route.params || {};
  const name = user?.name || "Kiran Glaucus";
  const image = user?.image || kiranGlaucus;

  const [activeTab, setActiveTab] = useState("Videos");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const videos = [photo1, photo2, photo3, photo4, photo5, photo6];
  const liked = [photo3, photo4, photo5, photo6, photo1, photo2];

  const renderGrid = (data) => (
    <View style={styles.videoGrid}>
      {data.map((img, idx) => (
        <View key={idx} style={styles.videoItem}>
          <Image source={img} style={styles.videoThumb} />
          <View style={styles.overlay}>
            <Ionicons name="play" size={14} color="#fff" />
            <Text style={styles.views}>1.5M views</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.ScrollView
        style={[styles.container, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#222" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#222"
              style={{ marginRight: 14 }}
            />
            <Ionicons name="ellipsis-vertical" size={20} color="#222" />
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={image} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>I love a colorful life ❤️❤️❤️</Text>

          <View style={styles.statsRow}>
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

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageBtn}>
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Accounts */}
        <View style={styles.suggestedSection}>
          <View style={styles.suggestedHeader}>
            <Text style={styles.suggestedTitle}>Suggested accounts</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.suggestedList}>
            {[ 
              { id: 1, name: "Flaura", image: flaura },
              { id: 2, name: "Bobb", image: bobb },
              { id: 3, name: "Kiddy", image: kiddy }
            ].map((item) => (
              <View key={item.id} style={styles.suggestedCard}>
                <View style={styles.closeButton}>
                  <Ionicons name="close" size={18} color="#999" />
                </View>

                <Image source={item.image} style={styles.suggestedAvatar} />
                <Text style={styles.suggestedName}>{item.name}</Text>
                <TouchableOpacity style={styles.suggestedFollowBtn}>
                  <Text style={styles.suggestedFollowText}>Follow</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab("Videos")}
            style={styles.tabItem}
          >
            <Ionicons
              name="play-outline"
              size={20}
              color={activeTab === "Videos" ? "#FF4081" : "#999"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "Videos" && styles.tabActive,
              ]}
            >
              Videos
            </Text>
            {activeTab === "Videos" && <View style={styles.activeLine} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Liked")}
            style={styles.tabItem}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color={activeTab === "Liked" ? "#FF4081" : "#999"}
            />
            <Text
              style={[styles.tabText, activeTab === "Liked" && styles.tabActive]}
            >
              Liked
            </Text>
            {activeTab === "Liked" && <View style={styles.activeLine} />}
          </TouchableOpacity>
        </View>

        {/* Video Grid */}
        {activeTab === "Videos" ? renderGrid(videos) : renderGrid(liked)}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 10,
    color: "#111",
  },
  bio: { fontSize: 14, color: "#666", marginTop: 4 },
  statsRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  statItem: { alignItems: "center", marginHorizontal: 12 },
  statNumber: { fontSize: 16, fontWeight: "700", color: "#111" },
  statLabel: { fontSize: 13, color: "#666", marginTop: 2 },
  actionRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  followBtn: {
    backgroundColor: "#FF4081",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  followText: { color: "#fff", fontWeight: "600" },
  messageBtn: {
    backgroundColor: "#ffe6f0",
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  messageText: { color: "#FF4081", fontWeight: "600" },

  suggestedSection: { marginTop: 28, paddingHorizontal: 16 },
  suggestedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  suggestedTitle: { fontWeight: "700", color: "#222", fontSize: 15 },
  viewMore: { color: "#FF4081", fontWeight: "600", fontSize: 13 },
  suggestedList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  suggestedCard: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    paddingVertical: 12,
    width: "30%",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  suggestedAvatar: { width: 60, height: 60, borderRadius: 30 },
  suggestedName: { marginTop: 6, fontSize: 14, fontWeight: "600" },
  suggestedFollowBtn: {
    marginTop: 6,
    backgroundColor: "#007bff",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  suggestedFollowText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabItem: { alignItems: "center", flex: 1 },
  tabText: { color: "#999", fontSize: 14, fontWeight: "500", marginTop: 2 },
  tabActive: { color: "#FF4081", fontWeight: "700" },
  activeLine: {
    height: 3,
    backgroundColor: "#FF4081",
    borderRadius: 2,
    width: width * 0.45,
    marginTop: 4,
  },
  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 14,
  },
  videoItem: {
    width: (width - 48) / 3,
    height: (width - 48) / 2.1,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  videoThumb: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    bottom: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  views: { color: "#fff", fontSize: 11, marginLeft: 4 },
});






