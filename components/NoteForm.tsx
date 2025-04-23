import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function NoteForm({ onSave, editingNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category);
    } else {
      clearForm();
    }
  }, [editingNote]);

  const handleSubmit = () => {
    if (!title || !content || !category) return;
    if (editingNote) {
      onSave(editingNote.id, title, content, category);
    } else {
      onSave(title, content, category);
    }
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, { height: 60 }]}
        multiline
      />
      <Button title={editingNote ? 'Update Note' : 'Add Note'} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
