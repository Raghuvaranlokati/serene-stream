// HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import LoadingScreen from './LoadingScreen'; // Import the LoadingScreen component
import { useNavigation } from '@react-navigation/native';

const apiKey = "AIzaSyBq1E18HtESCUqdnvuJm5qRZLJAYjp3-Pk";

const HomeScreen = () => {
  const [videos, setVideos] = useState([]);
  const [music, setMusic] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchYouTubeVideos();
      fetchYouTubeMusic();
    } else {
      setVideos([]);
      setMusic([]);
    }
  }, [searchQuery]);

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${searchQuery}&type=video&maxResults=10`);
      const data = await response.json();
      setVideos(data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setLoading(false);
    }
  };

  const fetchYouTubeMusic = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${searchQuery}+music&type=video&maxResults=6`);
      const data = await response.json();
      // Filter out live videos
      const filteredMusic = data.items.filter(item => item.snippet.liveBroadcastContent !== 'live');
      setMusic(filteredMusic);
    } catch (error) {
      console.error('Error fetching YouTube music:', error);
    }
  };

  const renderVideoCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Video', { videoId: item.id.videoId })}>
      <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
      <Text numberOfLines={2} style={styles.title}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  const renderMusicCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Music', { musicId: item.id.videoId })}>
      <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
      <Text numberOfLines={2} style={styles.title}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SereneStream</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search videos and music..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={fetchYouTubeVideos}
        />
      </View>
      <Text style={styles.sectionTitle}>Videos</Text>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoCard}
          keyExtractor={(item) => item.id.videoId}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.videoList}
        />
      )}
      <Text style={styles.sectionTitle}>Music</Text>
      <FlatList
        data={music}
        renderItem={renderMusicCard}
        keyExtractor={(item) => item.id.videoId}
        numColumns={3}
        contentContainerStyle={styles.musicList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  videoList: {
    marginBottom: 20,
  },
  musicList: {
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    padding: 10,
    fontSize: 14,
  },
});

export default HomeScreen;
