import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Button, Avatar } from 'react-native-paper';

export default function InstructorDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  // Mock data for features
  const SECTIONS = [{ id: 1, name: 'Section A' }, { id: 2, name: 'Section B' }];
  const LESSONS = [{ id: 1, title: 'Lesson 1' }, { id: 2, title: 'Lesson 2' }];
  const ACTIVITIES = [{ id: 1, question: 'Activity 1' }, { id: 2, question: 'Activity 2' }];
  const CONTENT = [{ id: 1, fileName: 'Content 1' }, { id: 2, fileName: 'Content 2' }];
  const PROFILE = {
    name: 'Mrs. Stephania',
    email: 'stephania@example.com',
    photo: 'https://via.placeholder.com/80',
  };

  const renderFeature = () => {
    switch (currentView) {
      case 'sections':
        return <FeatureList title="Sections" data={SECTIONS} onReturn={() => setCurrentView('dashboard')} />;
      case 'lessons':
        return <FeatureList title="Lessons" data={LESSONS} onReturn={() => setCurrentView('dashboard')} />;
      case 'activities':
        return <FeatureList title="Activities" data={ACTIVITIES} onReturn={() => setCurrentView('dashboard')} />;
      case 'content':
        return <FeatureList title="Content" data={CONTENT} onReturn={() => setCurrentView('dashboard')} />;
      case 'profile':
        return <ProfileView profile={PROFILE} onReturn={() => setCurrentView('dashboard')} />;
      default:
        return <DashboardView setCurrentView={setCurrentView} />;
    }
  };

  return <View style={styles.container}>{renderFeature()}</View>;
}

// Dashboard View
function DashboardView({ setCurrentView }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.classTitle}>Instructor Dashboard</Text>
        <Avatar.Image source={{ uri: 'https://via.placeholder.com/60' }} size={60} />
      </View>

      {/* Cards for Features */}
      <View style={styles.cardsContainer}>
        {FEATURES.map((feature, index) => (
          <Card key={index} style={styles.card} onPress={() => setCurrentView(feature.view)}>
            <View style={styles.cardContent}>
              <Icon name={feature.icon} size={40} color={feature.color} />
              <Text style={styles.cardText}>{feature.name}</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

// Feature List View
function FeatureList({ title, data, onReturn }) {
  return (
    <View style={styles.featureContainer}>
      <Button icon="arrow-left" mode="contained" onPress={onReturn} style={styles.returnButton}>
        Return
      </Button>
      <Text style={styles.featureTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name || item.title || item.question || item.fileName}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Profile View
function ProfileView({ profile, onReturn }) {
  return (
    <View style={styles.profileContainer}>
      <Button icon="arrow-left" mode="contained" onPress={onReturn} style={styles.returnButton}>
        Return
      </Button>
      <Image source={{ uri: profile.photo }} style={styles.profileImage} />
      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileEmail}>{profile.email}</Text>
    </View>
  );
}

const FEATURES = [
  { name: 'Sections', icon: 'folder-outline', color: '#6C63FF', view: 'sections' },
  { name: 'Lessons', icon: 'book-open-variant', color: '#FF6B6B', view: 'lessons' },
  { name: 'Activities', icon: 'clipboard-text', color: '#00C49F', view: 'activities' },
  { name: 'Content', icon: 'file-multiple', color: '#FFC107', view: 'content' },
  { name: 'Profile', icon: 'account-circle', color: '#40C4FF', view: 'profile' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  classTitle: { fontSize: 22, fontWeight: 'bold' },
  cardsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 },
  card: { width: '45%', marginVertical: 10, alignItems: 'center', backgroundColor: '#FFF', elevation: 4 },
  cardContent: { alignItems: 'center', padding: 20 },
  cardText: { marginTop: 10, fontSize: 12, fontWeight: '600', color: '#333', textAlign: 'center' },
  featureContainer: { flex: 1, padding: 20 },
  featureTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  listItem: { padding: 15, backgroundColor: '#FFF', marginVertical: 5, borderRadius: 5, elevation: 2 },
  profileContainer: { alignItems: 'center', padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { fontSize: 22, fontWeight: 'bold' },
  profileEmail: { fontSize: 16, color: '#666' },
  returnButton: { marginBottom: 10, alignSelf: 'flex-start' },
});
