// screens/VideoStreaming.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import backgroundStream from "../image/BackgroundStream.png";
import logostream from "../image/logostream.png";
import viewstream from "../image/viewstream.png";

import jane from "../image/Jane.png";
import lauren from "../image/Lauren.png";
import hien from "../image/hien.png";
import diem from "../image/diem.png";
import dang from "../image/dang.png";
import hieu from "../image/hieu.png";

import ball from "../image/ball.png";
import videoDog from "../video/videodog.mp4";
import sampleVideo from "../video/girl.mp4";

const EMOJIS = ["❤️", "👍", "🔥", "😍", "👏", "😂", "😮"];

export default function VideoStreaming() {
  const navigation = useNavigation();
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [comments, setComments] = useState([]);
  const [videoStage, setVideoStage] = useState("intro"); // "intro" | "main"
  const videoRef = useRef(null);

  // Emoji bay ngẫu nhiên
  useEffect(() => {
    const interval = setInterval(() => createFloatingEmoji(), 1000);
    return () => clearInterval(interval);
  }, []);

  const createFloatingEmoji = () => {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const left = Math.random() * 80 + 10;
    const animValue = new Animated.Value(0);
    const opacity = new Animated.Value(0.6); // bắt đầu mờ sẵn
    const newEmoji = { emoji, left, animValue, opacity, id: Math.random().toString() };

    setFloatingEmojis((prev) => [...prev, newEmoji]);

    Animated.parallel([
      Animated.timing(animValue, { toValue: 1, duration: 5000, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 5000, useNativeDriver: true }), // mờ dần tới 0
    ]).start(() => setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id)));
  };

  // Hiển thị comment từng người
  useEffect(() => {
    const timers = [
      setTimeout(() => showComment("Jane"), 2000),
      setTimeout(() => showComment("Lauren"), 7000),
      setTimeout(() => {
        setVideoStage("main"); // chuyển sang video thứ hai
        setTimeout(() => showComment("Toi bi ngu"), 2000);
        setTimeout(() => showComment("Ban Tao Toi"), 4000);
        setTimeout(() => showComment("All in"), 6000);
        setTimeout(() => showComment("Peaky Blinders"), 8000);
      }, 10000),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const showComment = (user) => {
    const fadeAnim = new Animated.Value(0);
    const translateY = new Animated.Value(20);

    let newComment = null;

    if (user === "Jane") {
      newComment = {
        id: "jane",
        user: "Jane",
        avatar: jane,
        text: "Is this product available in black?",
        fadeAnim,
        translateY,
      };
    } else if (user === "Lauren") {
      newComment = {
        id: "lauren",
        user: "Lauren",
        avatar: lauren,
        text: "I want to buy one for my daughter's upcoming birthday, how can I order?",
        fadeAnim,
        translateY,
      };
    } else if (user === "Toi bi ngu") {
      newComment = {
        id: "toibingu",
        user: "Toi bi ngu",
        avatar: hien,
        text: "Bạn này xinh quá shop.",
        fadeAnim,
        translateY,
      };
    } else if (user === "Ban Tao Toi") {
      newComment = {
        id: "bantaotoi",
        user: "Ban Tao Toi",
        avatar: diem,
        text: "aaaaaaaaaaaaa",
        fadeAnim,
        translateY,
      };
    } else if (user === "All in") {
      newComment = {
        id: "allin",
        user: "All in",
        avatar: dang,
        text: "Xin fb bạn này",
        fadeAnim,
        translateY,
      };
    } else if (user === "Peaky Blinders") {
      newComment = {
        id: "peaky",
        user: "Peaky Blinders",
        avatar: hieu,
        text: "Xịn nha Xịn nha",
        fadeAnim,
        translateY,
      };
    }

    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Video đầu (videodog) -> tự chuyển qua video sau (girl.mp4) */}
      <Video
        ref={videoRef}
        source={videoStage === "intro" ? videoDog : sampleVideo}
        style={styles.videoBackground}
        resizeMode="cover"
        shouldPlay
        isLooping={videoStage === "main"}
        onPlaybackStatusUpdate={(status) => {
          if (videoStage === "intro" && status.didJustFinish) {
            setVideoStage("main");
          }
        }}
      />

      {/* Emoji bay */}
      {floatingEmojis.map((e) => (
        <Animated.Text
          key={e.id}
          style={[
            styles.floatingEmoji,
            {
              left: `${e.left}%`,
              transform: [
                {
                  translateY: e.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, -600],
                  }),
                },
                {
                  scale: e.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                  }),
                },
              ],
              opacity: e.opacity,
            },
          ]}
        >
          {e.emoji}
        </Animated.Text>
      ))}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={logostream} style={styles.icon} />
          <Text style={styles.headerTitle}>Joy Shop</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.viewCount}>
            <Image source={viewstream} style={styles.viewImageFull} resizeMode="contain" />
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments */}
      <View style={styles.commentsContainer}>
        <ScrollView>
          {comments.map((c) => (
            <Animated.View
              key={c.id}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 10,
                opacity: c.fadeAnim,
                transform: [{ translateY: c.translateY }],
              }}
            >
              <Image source={c.avatar} style={styles.avatar} />
              <View style={styles.commentBubble}>
                <Text style={styles.userName}>{c.user}</Text>
                <Text style={styles.commentText}>{c.text}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Product info */}
      <View style={styles.productBox}>
        <Image source={ball} style={styles.productImage} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.productTitle}>Orange Ball</Text>
          <Text style={styles.productPrice}>$22</Text>
          <Text style={styles.productSold}>120 sold</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy now</Text>
        </TouchableOpacity>
      </View>

      {/* Comment input */}
      <View style={styles.commentInputRow}>
        <TextInput
          placeholder="Leave comment..."
          placeholderTextColor="#aaa"
          style={styles.commentInput}
        />
        <View style={styles.iconRow}>
          {["❤️", "👍", "😄"].map((emj, index) => (
            <TouchableOpacity key={index}>
              <Text style={styles.smallEmoji}>{emj}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  videoBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  floatingEmoji: {
    position: "absolute",
    bottom: 80,
    fontSize: 36,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    opacity: 0.6, // ban đầu mờ
  },
  header: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  icon: { width: 44, height: 44, borderRadius: 22, marginRight: 8 },
  headerTitle: { color: "#fff", fontWeight: "600", fontSize: 16 },
  viewCount: {
    backgroundColor: "transparent",
    borderRadius: 12,
    overflow: "hidden",
    width: 80,
    height: 30,
    marginRight: 10,
  },
  viewImageFull: { width: "100%", height: "100%", resizeMode: "contain" },
  commentsContainer: {
    position: "absolute",
    bottom: 180,
    left: 16,
    right: 16,
  },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  commentBubble: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 8,
    maxWidth: "80%",
  },
  userName: { color: "#fff", fontWeight: "600", marginBottom: 2 },
  commentText: { color: "#ddd", fontSize: 13 },
  productBox: {
    position: "absolute",
    bottom: 90,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 10,
  },
  productImage: { width: 60, height: 60, borderRadius: 10 },
  productTitle: { fontWeight: "700", fontSize: 16, color: "#222" },
  productPrice: { color: "#ff4081", fontWeight: "700", marginTop: 2 },
  productSold: { color: "#777", fontSize: 12 },
  buyButton: {
    backgroundColor: "#ff4081",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  buyButtonText: { color: "#fff", fontWeight: "600" },
  commentInputRow: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: { flex: 1, color: "#fff", paddingVertical: 6 },
  iconRow: { flexDirection: "row", alignItems: "center" },
  smallEmoji: { fontSize: 20, marginLeft: 10 },
});



