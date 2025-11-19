import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import backgroundgirl from "../image/backgroundgirl.png";

export default function CreateVideoPostVideo() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [facebook, setFacebook] = useState(true);
  const [twitter, setTwitter] = useState(false);
  const [instagram, setInstagram] = useState(true);
  const [selectedAudience, setSelectedAudience] = useState("All");
  const [showOptions, setShowOptions] = useState(false);

  const toggleDropdown = () => setShowOptions(!showOptions);
  const selectOption = (option) => {
    setSelectedAudience(option);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post on social</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.reviewText}>Review</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Cover photo */}
        <View style={styles.coverContainer}>
          <Image source={backgroundgirl} style={styles.coverImage} />
          <TouchableOpacity style={styles.changeCoverButton}>
            <Text style={styles.changeCoverText}>Change cover photo</Text>
          </TouchableOpacity>
        </View>

        {/* Title & Description */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Input title"
            placeholderTextColor="#cfcfcf"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, { marginTop: 16 }]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Input description"
            placeholderTextColor="#cfcfcf"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Hashtag */}
        <View style={styles.section}>
          <Text style={styles.label}>Add hashtag</Text>
          <View style={styles.hashtagBox}>
            <Text style={styles.hashtagText}>Happy moments ✕</Text>
          </View>
        </View>

        {/* Tag someone */}
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Tag someone</Text>
          <TouchableOpacity style={styles.tagRight}>
            <Text style={styles.tagCount}>3 people</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Comments */}
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Comments</Text>
          <Switch
            value={commentsEnabled}
            onValueChange={setCommentsEnabled}
            trackColor={{ false: "#ddd", true: "#ff4f8b" }}
            thumbColor="#fff"
          />
        </View>

        {/* Who can watch */}
        <View style={styles.sectionRow}>
          <Text style={styles.label}>Who can watch</Text>
          <View style={{ position: "relative" }}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
              <Text style={styles.dropdownText}>{selectedAudience}</Text>
              <Ionicons name="chevron-down" size={16} color="#999" />
            </TouchableOpacity>

            {/* Dropdown overlay */}
            {showOptions && (
              <View style={styles.dropdownOverlay}>
                {["All", "Friends", "Only me"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.option,
                      selectedAudience === option && { backgroundColor: "#ffeaf2" },
                    ]}
                    onPress={() => selectOption(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Also post on */}
        <View style={styles.section}>
          <Text style={styles.label}>Also post on</Text>

          <View style={styles.platformRow}>
            <View style={styles.platformLeft}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              <Text style={styles.platformName}>Facebook</Text>
            </View>
            <Switch
              value={facebook}
              onValueChange={setFacebook}
              trackColor={{ false: "#ddd", true: "#ff4f8b" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.platformRow}>
            <View style={styles.platformLeft}>
              <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
              <Text style={styles.platformName}>Twitter</Text>
            </View>
            <Switch
              value={twitter}
              onValueChange={setTwitter}
              trackColor={{ false: "#ddd", true: "#ff4f8b" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.platformRow}>
            <View style={styles.platformLeft}>
              <Ionicons name="logo-instagram" size={20} color="#E1306C" />
              <Text style={styles.platformName}>Instagram</Text>
            </View>
            <Switch
              value={instagram}
              onValueChange={setInstagram}
              trackColor={{ false: "#ddd", true: "#ff4f8b" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveDraftBtn}>
            <Ionicons name="download-outline" size={18} color="#ff4f8b" />
            <Text style={styles.saveDraftText}>Save draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postBtn}>
            <Ionicons name="send-outline" size={18} color="#fff" />
            <Text style={styles.postText}>Post on social</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 44 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: { marginRight: 4 },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#222" },
  reviewText: { color: "#ff4f8b", fontWeight: "500" },

  coverContainer: { alignItems: "center", marginTop: 18 },
  coverImage: { width: 220, height: 280, borderRadius: 12 },
  changeCoverButton: { marginTop: 12 },
  changeCoverText: { color: "#ff4f8b", fontSize: 14 },

  inputSection: { paddingHorizontal: 16, marginTop: 18 },
  label: { fontSize: 14, fontWeight: "500", color: "#222", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fafafa",
    color: "#000",
  },
  textArea: { height: 92, textAlignVertical: "top" },

  section: { marginTop: 18, paddingHorizontal: 16 },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 18,
  },

  hashtagBox: {
    marginTop: 8,
    backgroundColor: "#f0f6ff",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  hashtagText: { color: "#5599ff", fontSize: 13 },
  tagRight: { flexDirection: "row", alignItems: "center" },
  tagCount: { color: "#5599ff", marginRight: 6 },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fafafa",
  },
  dropdownText: { color: "#333", marginRight: 6 },

  // ✅ Dropdown nổi (overlay)
  dropdownOverlay: {
    position: "absolute",
    top: 38,
    right: 0,
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 999,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionText: { color: "#333", fontSize: 14 },

  platformRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  platformLeft: { flexDirection: "row", alignItems: "center" },
  platformName: { marginLeft: 8, fontSize: 14, color: "#000" },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 28,
    alignItems: "center",
  },
  saveDraftBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4f8b",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  saveDraftText: { color: "#ff4f8b", fontWeight: "600", marginLeft: 8 },
  postBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4f8b",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: "center",
  },
  postText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
});

