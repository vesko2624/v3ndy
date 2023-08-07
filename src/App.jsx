/**
 * Internal dependencies
 */
import '@/App.css'
import useProductsIndexQuery from "@/server/products/use-products-index-query.js";
import useProductsStoreMutation from "@/server/products/use-products-store-mutation.js";

function App() {
    const { data: products = [] } = useProductsIndexQuery();
    const productsStoreMutation = useProductsStoreMutation();

    return (
      <div>
          <ul>
              {products.map((product) => {
                  return (
                    <li key={product.id}>{product.name}</li>
                  )
              })}
          </ul>

        <button
          type="button"
          onClick={() => {
              productsStoreMutation.mutateAsync({
                  name: 'ivan',
              })
          }}
        >
            add
        </button>
      </div>
    )
}

export default App
