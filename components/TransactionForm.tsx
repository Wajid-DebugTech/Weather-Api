import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Transaction, TransactionType } from '../interfaces';

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<string>('food');

  const handleSubmit = () => {
    if (!amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString(),
    };

    onAdd(newTransaction);
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount ($)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Type</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={type} onValueChange={(value) => setType(value)} style={styles.picker}>
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Income" value="income" />
        </Picker>
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={category} onValueChange={(value) => setCategory(value)} style={styles.picker}>
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Travel" value="travel" />
          <Picker.Item label="Shopping" value="shopping" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <Button title="Add Transaction" onPress={handleSubmit} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 30 },
  label: { fontWeight: '600', marginBottom: 4, marginTop: 10 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  picker: {
    height: 45,
    paddingHorizontal: 10,
  },
});
