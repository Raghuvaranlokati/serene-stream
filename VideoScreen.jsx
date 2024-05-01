// VideoScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const VideoScreen = ({ route, navigation }) => {
  const { videoId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => {
      // No need to unlock screen orientation here
    };
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
      </View>

      {/* Video */}
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${videoId}?autoplay=1` }}
        style={styles.webview}
        allowsFullscreenVideo
        onLoad={handleLoad}
      />

      {/* Loading Screen */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Image source={require('./assets/loading.gif')} style={styles.loadingGif} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 100,
    height: 100,
  },
});

export default VideoScreen;
