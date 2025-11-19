import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

import kiranGlaucus from "../image/KiranGlaucus.png";
import sallyRooney from "../image/Lina.png";
import marieFranco from "../image/MarieFranco.png";
import jenaNguyen from "../image/JenaNguyen.png";
import kristinWatson from "../image/KristinWatson.png";

export default function VideoWatching() {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(19600);
  const [showComments, setShowComments] = useState(false);

  // Danh sách comment (thêm avatar)
  const [comments, setComments] = useState([
    {
      id: "1",
      name: "Laura",
      text: "So cute, I wish my cat was like that",
      time: "6 mins ago",
      liked: true,
      avatar: kiranGlaucus,
    },
    {
      id: "2",
      name: "Lauren",
      text: 'Look at her, as if "mom, i want food"',
      time: "20 mins ago",
      liked: true,
      avatar: sallyRooney,
    },
    {
      id: "3",
      name: "Liz",
      text: "My cats also often wait for me to come home from work in front of the door hehe",
      time: "24 mins ago",
      liked: true,
      avatar: marieFranco,
    },
    {
      id: "4",
      name: "Anne",
      text: "Awwwwww",
      time: "30 mins ago",
      liked: false,
      avatar: jenaNguyen,
    },
    {
      id: "5",
      name: "Larry",
      text: "I want to cuddle",
      time: "20 mins ago",
      liked: false,
      avatar: kristinWatson,
    },
  ]);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.durationMillis) {
      const progressValue = status.positionMillis / status.durationMillis;
      setProgress(progressValue);
    }
  };

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const toggleCommentLike = (id) => {
    setComments((prev) =>
      prev.map((cmt) =>
        cmt.id === id ? { ...cmt, liked: !cmt.liked } : cmt
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Video nền */}
      <Video
        ref={videoRef}
        source={require("../video/videocat.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      {/* Nút đóng */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      {/* --- Layout 2 cột song song dưới cùng --- */}
      <View style={styles.contentRow}>
        {/* BÊN TRÁI */}
        <View style={styles.leftColumn}>
          <Text style={styles.userName}>Laura</Text>
          <Text style={styles.caption}>She waits for me</Text>
          <Text style={styles.tags}>#lovepet  #cat</Text>

          <View style={styles.musicRow}>
            <Ionicons name="musical-notes" size={14} color="#fff" />
            <Text style={styles.musicText}> Baby shark - Kingfong</Text>
          </View>
        </View>

        {/* BÊN PHẢI */}
        <View style={styles.rightColumn}>
          <TouchableOpacity>
            <Image
              source={require("../image/Laura.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.iconBlock}>
            <TouchableOpacity onPress={toggleLike}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={34}
                color={liked ? "#ff2d55" : "#fff"}
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>
              {(likeCount / 1000).toFixed(1)}k
            </Text>
          </View>

          <View style={styles.iconBlock}>
            <TouchableOpacity onPress={() => setShowComments(true)}>
              <Ionicons name="chatbubble-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.iconText}>700</Text>
          </View>

          <View style={styles.iconBlock}>
            <Ionicons name="ellipsis-horizontal" size={28} color="#fff" />
          </View>
        </View>
      </View>

      {/* --- Thanh tiến độ video --- */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* --- POPUP COMMENT --- */}
      <Modal
        visible={showComments}
        transparent
        animationType="slide"
        onRequestClose={() => setShowComments(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentBox}>
            {/* Header */}
            <View style={styles.commentHeader}>
              <Text style={styles.commentTitle}>700 comments</Text>
              <TouchableOpacity onPress={() => setShowComments(false)}>
                <Ionicons name="close" size={26} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Danh sách bình luận */}
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Image source={item.avatar} style={styles.commentAvatar} />
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.commentName}>{item.name}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                    <Text style={styles.commentTime}>{item.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleCommentLike(item.id)}
                    style={{ padding: 5 }}
                  >
                    <Ionicons
                      name={item.liked ? "heart" : "heart-outline"}
                      size={22}
                      color={item.liked ? "#ff2d55" : "#aaa"}
                    />
                  </TouchableOpacity>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
            />

            {/* Ô nhập comment */}
            <View style={styles.inputRow}>
              <TextInput
                placeholder="Leave comment..."
                placeholderTextColor="#aaa"
                style={styles.input}
              />
              <TouchableOpacity>
                <Ionicons name="send" size={22} color="#ff4081" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "flex-end" },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 12,
    marginBottom: 10,
  },
  userName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 6,
  },
  caption: { color: "#fff", fontSize: 17, marginBottom: 4 },
  tags: { color: "#ddd", fontSize: 13, marginBottom: 8 },
  musicRow: { flexDirection: "row", alignItems: "center" },
  musicText: { color: "#fff", fontSize: 13, marginLeft: 4 },

  rightColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 20,
  },
  iconBlock: { alignItems: "center", marginBottom: 20 },
  iconText: { color: "#fff", fontSize: 13, marginTop: 4 },

  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff4081",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  commentBox: {
    backgroundColor: "#fff",
    height: "55%", // vừa đủ cho 5 comment như Android
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  commentTitle: { fontSize: 18, fontWeight: "700", color: "#000" },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  commentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  commentTextContainer: { flex: 1 },
  commentName: { fontWeight: "600", color: "#000", marginBottom: 2 },
  commentText: { color: "#333", marginBottom: 4 },
  commentTime: { color: "#999", fontSize: 12 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 36,
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
    paddingHorizontal: 12,
    color: "#000",
    marginRight: 8,
  },
});
