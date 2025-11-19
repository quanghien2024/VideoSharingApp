// screens/CreateVideoUploadVideo.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import addmusic from "../image/addmusic.png";
import backgroundgirl from "../image/backgroundgirl.png";

const { width } = Dimensions.get("window");

export default function CreateVideoUploadVideo() {
  const navigation = useNavigation();

  const handleFlip = () => console.log("Flip clicked");
  const handleFilter = () => navigation.navigate("CreateVideoSelectFilter");
  const handleTimer = () => console.log("Timer clicked");
  const handleFlash = () => console.log("Flash clicked");

  // Add music screen
  const handleAddMusic = () => navigation.navigate("CreateVideoSelectMusic");

  // ✅ Khi ấn nút quay -> chuyển sang màn Post Video
  const handleRecord = () => navigation.navigate("CreateVideoPostVideo");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundgirl} style={styles.background} resizeMode="cover">
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.centerHeader} onPress={handleAddMusic}>
            <Image source={addmusic} style={styles.audioImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.sideTools}>
          <TouchableOpacity style={styles.toolItem} onPress={handleFlip}>
            <Ionicons name="camera-reverse-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolItem} onPress={handleFilter}>
            <Ionicons name="color-filter-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolItem} onPress={handleTimer}>
            <Ionicons name="timer-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolItem} onPress={handleFlash}>
            <Ionicons name="flash-outline" size={34} color="#fff" />
            <Text style={styles.toolText}>Flash</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomItem}>
            <Ionicons name="sparkles-outline" size={34} color="#fff" />
            <Text style={styles.bottomText}>Effect</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomItem}>
            <Ionicons name="cloud-upload-outline" size={34} color="#fff" />
            <Text style={styles.bottomText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  topBar: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    left: 38,
    top: 0,
    zIndex: 2,
  },
  closeIcon: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
  },
  centerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  audioImage: {
    width: 150,
    height: 40,
  },
  sideTools: {
    position: "absolute",
    right: 20,
    top: "24%",
    alignItems: "center",
  },
  toolItem: {
    alignItems: "center",
    marginBottom: 25,
  },
  toolText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  bottomBar: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomItem: {
    alignItems: "center",
  },
  bottomText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 2,
  },
  recordButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#ff2d55",
  },
});



