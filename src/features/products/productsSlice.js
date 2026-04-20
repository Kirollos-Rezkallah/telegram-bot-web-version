import { createSlice } from '@reduxjs/toolkit';

import { seedProductsState } from '../../services/seedData';
import { createId } from '../../utils/createId';

const productsSlice = createSlice({
  name: 'products',
  initialState: seedProductsState,
  reducers: {
    createProduct: {
      reducer(state, action) {
        const product = action.payload;

        state.ids.push(product.id);
        state.entities[product.id] = product;
      },
      prepare(product) {
        return {
          payload: {
            id: createId('prod'),
            isAvailable: true,
            sizeOptions: [],
            tags: [],
            leadTimeHours: 48,
            ...product,
          },
        };
      },
    },
    upsertProduct(state, action) {
      const product = action.payload;

      if (!state.entities[product.id]) {
        state.ids.push(product.id);
      }

      state.entities[product.id] = {
        ...state.entities[product.id],
        ...product,
      };
    },
    setProductAvailability(state, action) {
      const { isAvailable, productId } = action.payload;

      if (state.entities[productId]) {
        state.entities[productId].isAvailable = isAvailable;
      }
    },
    deleteProduct(state, action) {
      const productId = action.payload;

      if (state.entities[productId]) {
        delete state.entities[productId];
        state.ids = state.ids.filter((id) => id !== productId);
      }
    },
  },
});

export const { createProduct, deleteProduct, setProductAvailability, upsertProduct } = productsSlice.actions;
export default productsSlice.reducer;
