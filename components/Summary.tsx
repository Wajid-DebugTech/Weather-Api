import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../interfaces';

interface Props {
  transactions: Transaction[];
}

export default function Summary({ transactions }: Props) {
  const total = transactions.reduce(
    (acc, t) => (t.type === 'income' ? acc + t.amount : acc - t.amount),
    0
  );

  const byCategory: Record<string, number> = {};
  transactions.forEach((t) => {
    if (t.type === 'expense') {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Balance: ${total.toFixed(2)}</Text>
      <Text style={styles.header}>Expenses by Category:</Text>
      {Object.entries(byCategory).map(([cat, amount]) => (
        <Text key={cat}>
          {cat}: ${amount.toFixed(2)}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  total: { fontSize: 20, fontWeight: 'bold' },
  header: { marginTop: 10, fontWeight: 'bold' },
});
