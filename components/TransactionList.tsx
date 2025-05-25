import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Transaction } from '../interfaces';

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  return (
    <View>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={item.type === 'income' ? styles.income : styles.expense}>
              {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
            </Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
  card: {
    backgroundColor: '#f1f8e9',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 1,
  },
  income: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  expense: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: 16,
  },
  category: {
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
