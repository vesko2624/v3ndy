/**
 * External dependencies
 */
import { createBrowserRouter } from "react-router-dom";
import ProductsIndexPage from "@/domain/products/pages/products-index-page.jsx";

const router = createBrowserRouter([
    {
        path: "/products",
        Component: ProductsIndexPage,
    },
]);

export default router;