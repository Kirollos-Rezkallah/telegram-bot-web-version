export const selectProductById = (state, productId) => state.products.entities[productId] ?? null;

export const selectProductsList = (state) => state.products.ids.map((id) => state.products.entities[id]).filter(Boolean);
