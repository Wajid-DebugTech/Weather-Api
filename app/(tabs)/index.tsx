import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await AsyncStorage.getItem('notes');
    if (data) setNotes(JSON.parse(data));
  };

  const saveNotes = async (newNotes) => {
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const handleSave = () => {
    if (!noteText.trim() || !noteCategory.trim()) return;
    if (editingNote) {
      const updated = notes.map(n => n.id === editingNote.id ? { ...n, text: noteText, category: noteCategory } : n);
      setNotes(updated);
      saveNotes(updated);
      setEditingNote(null);
    } else {
      const newNote = { id: uuid.v4(), text: noteText, category: noteCategory };
      const updated = [newNote, ...notes];
      setNotes(updated);
      saveNotes(updated);
    }
    setNoteText('');
    setNoteCategory('');
    setModalVisible(false);
  };

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setNoteText(note.text);
    setNoteCategory(note.category);
    setModalVisible(true);
  };

  const renderNote = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.noteCategory}>{item.category}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => editNote(item)}>
            <Feather name="edit" size={18} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteNote(item.id)}>
            <AntDesign name="delete" size={18} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.noteText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderNote}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={56} color="#4CAF50" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Category"
            value={noteCategory}
            onChangeText={setNoteCategory}
            style={styles.input}
          />
          <TextInput
            placeholder="Note"
            value={noteText}
            onChangeText={setNoteText}
            multiline
            style={[styles.input, { height: 80 }]}
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
            <Button title={editingNote ? 'Update' : 'Save'} onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  noteCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noteText: {
    fontSize: 16,
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  icon: {
    marginHorizontal: 8,
    color: '#555',
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
