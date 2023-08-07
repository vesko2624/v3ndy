/**
 * External dependencies
 */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from "zustand/middleware";

const useServerStore = create(
  persist(
      immer((set, state) => ({
          products: [],
          account: { balance: 0 },
          addProduct: (product) => {
              set((state) => {
                  state.products = [...state.products, product];
              });
          },
          addMoney: (money) => {
              set((state) => {
                  state.account.balance = state.account.balance + money;
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
      })),
    {
        name: '@server',
        storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useServerStore;
