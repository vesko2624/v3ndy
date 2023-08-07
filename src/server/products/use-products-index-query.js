import useServerQuery from "@/server/use-server-query.js";

const useProductsIndexQuery = () => {
    return useServerQuery((products) => {
        return products;
    }, (store) => store.products);
}

export default useProductsIndexQuery;