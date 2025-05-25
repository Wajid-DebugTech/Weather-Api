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
    <View style={styles.card}>
      <Text style={styles.total}>Balance: ${total.toFixed(2)}</Text>
      <Text style={styles.header}>Expenses by Category:</Text>
      {Object.entries(byCategory).map(([cat, amount]) => (
        <Text key={cat} style={styles.categoryItem}>
          {cat}: ${amount.toFixed(2)}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  total: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0d47a1',
  },
  header: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  categoryItem: {
    paddingVertical: 2,
    color: '#333',
  },
});
