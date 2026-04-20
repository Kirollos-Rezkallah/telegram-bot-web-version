export const selectCategoriesList = (state) =>
  state.categories.ids
    .map((id) => state.categories.entities[id])
    .filter(Boolean)
    .sort((a, b) => a.sortOrder - b.sortOrder);
