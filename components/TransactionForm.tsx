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
      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text>Type:</Text>
      <Picker selectedValue={type} onValueChange={(value) => setType(value)} style={styles.input}>
        <Picker.Item label="Expense" value="expense" />
        <Picker.Item label="Income" value="income" />
      </Picker>
      <Text>Category:</Text>
      <Picker selectedValue={category} onValueChange={(value) => setCategory(value)} style={styles.input}>
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Travel" value="travel" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <Button title="Add Transaction" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: { marginVertical: 5, padding: 8, borderWidth: 1, borderColor: '#ccc' },
});
