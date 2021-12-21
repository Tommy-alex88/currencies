import { configureStore, createSlice } from "@reduxjs/toolkit";

// initial state sets default base currency, empty array of currencies
// and loading state
const initialState = {
  currencies: [],
  baseCurrency: "RUB",
  loading: false,
};

// slice contains three reducers to manipulate the state:
// to update currency list, to change base currency and to update(toggle) loading state
const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    update(state, action) {
      return { ...state, currencies: action.payload };
    },
    changeBaseCurrency(state, action) {
      return { ...state, baseCurrency: action.payload };
    },
    updateLoadingStatus(state, action) {
      return { ...state, loading: action.payload };
    },
  },
});

// confugureStore with root reducer
const store = configureStore({
  reducer: currenciesSlice.reducer,
});

export const currenciesActions = currenciesSlice.actions;

export default store;
