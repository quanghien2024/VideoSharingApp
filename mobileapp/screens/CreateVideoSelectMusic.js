import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

import backgroundgirl from "../image/backgroundgirl.png";

import music1 from "../image/music1.png";
import music2 from "../image/music2.png";
import music3 from "../image/music3.png";
import music4 from "../image/music4.png";
import music5 from "../image/music5.png";

const musicList = [
  { id: "1", title: "Beautiful lady", duration: "00:30", image: music1, audio: require("../sounds/music1.mp3") },
  { id: "2", title: "Nice day", duration: "00:30", image: music2, audio: require("../sounds/music1.mp3") },
  { id: "3", title: "Sunny", duration: "00:30", image: music3, audio: require("../sounds/music1.mp3") },
  { id: "4", title: "Flowers", duration: "00:30", image: music4, audio: require("../sounds/music1.mp3") },
  { id: "5", title: "Morning coffee", duration: "00:30", image: music5, audio: require("../sounds/music1.mp3") },
];

export default function CreateVideoSelectMusic({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("For you");
  const [playingId, setPlayingId] = useState(null);
  const soundRef = useRef(null);

  // ✅ Cleanup toàn bộ khi rời màn hình (dừng nhạc)
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (soundRef.current) {
          soundRef.current.stopAsync();
          soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        setPlayingId(null);
      };
    }, [])
  );

  // ✅ Hàm xử lý phát / dừng
  const handlePlayPause = async (item) => {
    try {
      // Nếu đang phát bài này -> dừng
      if (playingId === item.id) {
        await soundRef.current?.stopAsync();
        await soundRef.current?.unloadAsync();
        soundRef.current = null;
        setPlayingId(null);
        return;
      }

      // Nếu đang phát bài khác -> dừng trước
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Tạo sound mới
      const { sound } = await Audio.Sound.createAsync(item.audio, {
        shouldPlay: true,
      });

      // Khi phát xong -> tự reset playingId
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingId(null);
          sound.unloadAsync();
          soundRef.current = null;
        }
      });

      soundRef.current = sound;
      setPlayingId(item.id);
    } catch (err) {
      console.log("Sound error:", err);
    }
  };

  const renderItem = ({ item }) => {
    const isPlaying = playingId === item.id;

    return (
      <TouchableOpacity
        style={styles.musicItem}
        onPress={() => handlePlayPause(item)}
        activeOpacity={0.8}
      >
        <View>
          <Image source={item.image} style={styles.musicImage} />
          <View style={styles.playingOverlay}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="#fff"
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.musicTitle}>{item.title}</Text>
          <Text style={styles.musicDuration}>{item.duration}</Text>
        </View>
        <TouchableOpacity style={styles.useButton}>
          <Text style={styles.useButtonText}>Use</Text>
        </TouchableOpacity>
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color="#555"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundgirl}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.bottomPanel}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add audio</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="search-outline"
                size={22}
                color="#555"
                style={{ marginRight: 15 }}
              />
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close-outline" size={28} color="#555" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsRow}>
            {["For you", "Trending", "Saved"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[
                  styles.tabButton,
                  selectedTab === tab && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Danh sách nhạc */}
          <FlatList
            data={musicList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  background: { flex: 1, width: "100%", height: "100%" },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%", // panel ngắn gọn
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tabButton: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: { backgroundColor: "#ff7eb9" },
  tabText: { color: "#555", fontWeight: "600" },
  activeTabText: { color: "#fff" },
  musicItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  musicImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  musicTitle: { fontWeight: "600", fontSize: 16 },
  musicDuration: { color: "#888", fontSize: 13 },
  useButton: {
    borderWidth: 1,
    borderColor: "#ff7eb9",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  useButtonText: { color: "#ff7eb9", fontWeight: "600" },
  playingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

