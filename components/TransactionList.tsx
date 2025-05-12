import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Transaction } from '../interfaces';

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  return (
    <View>
      <Text style={styles.title}>Transactions:</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)} | {item.category}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 18, marginVertical: 8 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
