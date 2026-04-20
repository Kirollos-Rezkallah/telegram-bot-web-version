import { createSlice } from '@reduxjs/toolkit';

import { seedCategoriesState } from '../../services/seedData';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: seedCategoriesState,
  reducers: {
    upsertCategory(state, action) {
      const category = action.payload;

      if (!state.entities[category.id]) {
        state.ids.push(category.id);
      }

      state.entities[category.id] = {
        ...state.entities[category.id],
        ...category,
      };
    },
  },
});

export const { upsertCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
