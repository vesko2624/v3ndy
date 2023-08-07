/**
 * External dependencies
 */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useServerStore = create(
  immer((set) => ({
      products: [],
      addProduct: (product) => {
          set((state) => {
              state.products = [...state.products, product];
          });
      }
  }))
);
export default useServerStore;
