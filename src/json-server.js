const transactionsUrl = 'http://localhost:5000/transactions';
const categoriesUrl = 'http://localhost:5000/categories';

export const loadTransactions = () => {
  return fetch(transactionsUrl)
    .then((res) => res.json())
}

export const loadCategories = () => {
  return fetch(transactionsUrl)
    .then((res) => res.json())
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};
