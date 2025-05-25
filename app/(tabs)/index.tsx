import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import Summary from '../../components/Summary';
import { loadTransactions, saveTransactions } from '../../store/store';
import { Transaction } from '../../interfaces';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions().then(setTransactions);
  }, []);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <TransactionForm onAdd={addTransaction} />
        <Summary transactions={transactions} />
        <TransactionList transactions={transactions} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#f2f2f2', },
});
