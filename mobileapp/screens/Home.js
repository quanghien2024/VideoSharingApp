import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar, // ✅ thêm dòng này
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// 👉 Import hình local
import logohome from '../image/logohome.png';
import cointainer13 from '../image/Cointainer13.png';
import adam from '../image/Adam.png';
import william from '../image/William.png';
import peter from '../image/Peter.png';
import julia from '../image/Julia.png';
import rose from '../image/Rose.png';
import lovely from '../image/Lovely.png';
import sweet from '../image/Sweet.png';
import explorebuddy from '../image/Explorebuddy.png';
import sports from '../image/Sports.png';
import podcasts from '../image/Podcasts.png';
import news from '../image/News.png';
import travel from '../image/Travel.png';
import health from '../image/Health.png';
import weather from '../image/Weather.png';
import art from '../image/Art.png';
import topic from '../image/Topic.png';
import lifestyle from '../image/Lifestyle.png';
import cooking from '../image/Cooking.png';
import dancing from '../image/Dancing.png';
import perfectlady from '../image/Perfectlady.png';
import experience from '../image/Experience.png';
import yourself from '../image/Yourself.png';
import experience1 from '../image/Experience1.png';

const { width } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();

  const topAvatars = [
    { id: 'a', image: cointainer13, name: 'You' },
    { id: 'b', image: adam, name: 'Adam' },
    { id: 'c', image: william, name: 'William' },
    { id: 'd', image: peter, name: 'Peter' },
    { id: 'e', image: julia, name: 'Julia' },
    { id: 'f', image: rose, name: 'Rose' },
  ];

  const trending = [
    { id: '1', image: lovely },
    { id: '2', image: sweet },
    { id: '3', image: explorebuddy },
  ];

  const topics = [
    { id: 't1', image: sports },
    { id: 't2', image: podcasts },
    { id: 't3', image: news },
    { id: 't4', image: travel },
    { id: 't5', image: health },
    { id: 't6', image: weather },
    { id: 't7', image: art },
    { id: 't8', image: topic },
  ];

  const streaming = [
    { id: 's1', image: lifestyle },
    { id: 's2', image: cooking },
    { id: 's3', image: dancing },
  ];

  const audio = [
    { id: 'a1', title: 'Perfect Lady', subtitle: 'Bookcase', image: perfectlady },
    { id: 'a2', title: 'Experience', subtitle: 'Lifestyle', image: experience },
    { id: 'a3', title: 'Yourself', subtitle: 'Bookcase', image: yourself },
    { id: 'a4', title: 'Dreamer', subtitle: 'Lifestyle', image: experience1 },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]} // ✅ thêm dòng này
    >
      {/* Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerLeft}>
          <Image source={logohome} style={styles.logo} resizeMode="contain" />
          <Text style={styles.appTitle}>Video Sharing App</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Notification pressed!')}>
          <Ionicons name="notifications-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 60 }} />

        {/* Avatars */}
        <FlatList
          data={topAvatars}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.avatarContainer}>
              <Image source={item.image} style={styles.avatar} />
              <Text style={styles.avatarName}>{item.name}</Text>
            </View>
          )}
        />

        {/* Trending */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top trending</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trending}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.imageOnlyCard}
                onPress={() => navigation.navigate('VideoWatching')}
              >
                <Image source={item.image} style={styles.imageOnly} />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Browse topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse topic</Text>
          <View style={styles.topicsContainer}>
            {topics.map((topic) => (
              <View key={topic.id} style={styles.topicCard}>
                <Image source={topic.image} style={styles.topicImage} />
              </View>
            ))}
          </View>
        </View>

        {/* Streaming */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Streaming</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={streaming}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.imageOnlyCard}
                onPress={() => navigation.navigate('VideoStreaming')}
              >
                <Image source={item.image} style={styles.imageOnly} />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Audio */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Audio</Text>
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={audio}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.audioCard}>
                <Image source={item.image} style={styles.audioImage} />
                <Text style={styles.audioTitle}>{item.title}</Text>
                <Text style={styles.audioSubtitle}>{item.subtitle}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },

  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 22, height: 22, marginRight: 8 },
  appTitle: { fontSize: 20, fontWeight: '700' },

  avatarContainer: { alignItems: 'center', marginRight: 16 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  avatarName: { marginTop: 6, fontSize: 12 },

  section: { marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  viewMore: { fontSize: 14, color: '#ff69b4', fontWeight: '500' },

  imageOnlyCard: { marginRight: 12, borderRadius: 12, overflow: 'hidden' },
  imageOnly: { width: 150, height: 180, borderRadius: 12 },

  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicCard: {
    width: (width - 64) / 4,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  topicImage: { width: '100%', height: '100%' },

  audioCard: { alignItems: 'center', marginRight: 12 },
  audioImage: { width: 100, height: 100, borderRadius: 12 },
  audioTitle: { fontWeight: '600', marginTop: 6 },
  audioSubtitle: { color: '#777' },
});




