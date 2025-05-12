import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import todoReducer from './features/todoSlice';
import categoryReducer from './features/categoriesSlice';

export const clearPersistedData = () => {
  persistStore(store).purge();
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedTodoReducer = persistReducer(persistConfig, todoReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);

const store = configureStore({
  reducer: {
    todos: persistedTodoReducer,
    categories: persistedCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// expense tracker work
import { Transaction } from '../interfaces';

const STORAGE_KEY = 'transactions';

export async function saveTransactions(transactions: Transaction[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (e) {
    console.error('Failed to save transactions:', e);
  }
}

export async function loadTransactions(): Promise<Transaction[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load transactions:', e);
    return [];
  }
}
// expense tracker work end


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
