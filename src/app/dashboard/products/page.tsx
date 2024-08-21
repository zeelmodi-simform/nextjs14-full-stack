
import Header from "@/components/Header"
import ProductsDataTable from "@/components/ProductsDataTable"
import SearchBar from "@/components/SearchBar"
import { Button } from "@/components/ui/button"
import { fetchProducts } from "@/lib/data"
import Link from "next/link"


const ProductsPage = async ({ searchParams }: { searchParams: { search: string, page: number, limit?: number } }) => {

  const searchTerm = searchParams.search || '';
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 5;


  const { products, totalCount } = await fetchProducts(searchTerm, page, limit)

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Header title="Products" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SearchBar placeholder="Search products..." />
          <Link href={ `/dashboard/products/add` }>
            <Button>Create New Product</Button>
          </Link>
        </div>
        <ProductsDataTable products={ JSON.parse(JSON.stringify(products)) } totalCount={ totalCount } />
      </div>
    </main>
  );
};

export default ProductsPage