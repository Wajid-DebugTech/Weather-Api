import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import NoteForm from '../../components/NoteForm';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await AsyncStorage.getItem('notes');
    if (data) {
      setNotes(JSON.parse(data));
    }
  };

  const saveNotes = async (updatedNotes) => {
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = (title, content, category) => {
    const newNote = {
      id: uuid.v4(),
      title,
      content,
      category,
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const updateNote = (id, title, content, category) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { id, title, content, category } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => setEditingNote(item)}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text>{item.category}</Text>
      <Text numberOfLines={1}>{item.content}</Text>
      <Button title="Delete" color="red" onPress={() => deleteNote(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 Notes App</Text>
      <NoteForm
        onSave={editingNote ? updateNote : addNote}
        editingNote={editingNote}
      />
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f2f2f2',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
