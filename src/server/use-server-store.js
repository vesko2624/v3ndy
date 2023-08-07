/**
 * External dependencies
 */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useServerStore = create(
  immer((set, state) => ({
      products: [],
      addProduct: (product) => {
          set((state) => {
              state.products = [...state.products, product];
          });
      },
      updateProduct: (product) => {
          set((state) => {
              state.products = state.products.map((item) => {
                  if (item.id === product.id) {
                      return { ...product };
                  }

                  return item;
              })
          });
      },
      findProduct: (id) => state().products.find((product) => product.id === id),
      removeProduct: (id) => {
          set((state) => {
              state.products = state.products.filter((product) => product.id !== id);
          });
      },
  }))
);
export default useServerStore;
