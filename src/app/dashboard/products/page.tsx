'use client'

import { DataTable } from "@/components/DataTable"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import TablePagination from "@/components/TablePagination"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { IProduct } from "@/lib/types"
import { EyeIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Props = {}

const ProductsPage = (props: Props) => {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)

  const products: IProduct[] = [
    {
      id: 1,
      name: 'iPhone',
      description: 'iPhone 13',
      price: 799,
      createdAt: '2021-09-01',
      stock: 99,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21',
      price: 699,
      stock: 20,
      createdAt: '2021-08-15',
    },
    {
      id: 3,
      name: 'Sony PlayStation 5',
      description: 'Sony PlayStation 5',
      price: 499,
      stock: 10,
      createdAt: '2021-07-20',
    },
    {
      id: 4,
      name: 'MacBook Pro',
      description: 'MacBook Pro',
      price: 1299,
      stock: 5,
      createdAt: '2021-06-10',
    },
    {
      id: 5,
      name: 'Dell XPS 13',
      description: 'Dell XPS 13',
      price: 999,
      stock: 0,
      createdAt: '2021-05-05',
    },
    {
      id: 6,
      name: 'iPhone',
      description: 'iPhone 13',
      price: 799,
      createdAt: '2021-09-01',
      stock: 99,
    },
    {
      id: 7,
      name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21',
      price: 699,
      stock: 20,
      createdAt: '2021-08-15',
    },
    {
      id: 8,
      name: 'Sony PlayStation 5',
      description: 'Sony PlayStation 5',
      price: 499,
      stock: 10,
      createdAt: '2021-07-20',
    },
    {
      id: 9,
      name: 'MacBook Pro',
      description: 'MacBook Pro',
      price: 1299,
      stock: 5,
      createdAt: '2021-06-10',
    },
    {
      id: 10,
      name: 'Dell XPS 13',
      description: 'Dell XPS 13',
      price: 999,
      stock: 0,
      createdAt: '2021-05-05',
    }
  ];
    
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  // console.log({currentProducts});
  
  const getNameAvatar = (name: string) => {
    const nameArray = name.split(" ")
    return nameArray.map((word) => word.charAt(0).toUpperCase()).join("")
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Header title="Products" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">          
          <SearchBar placeholder="Search products..." value={ search } onChange={ handleSearch } />
          <Link href={ `/dashboard/products/add` }>
            <Button>Create New Product</Button>
          </Link>
        </div>
        <Card>
          <DataTable
            data={ products }
            columns={ [
              {
                label: "Title",
                accessor: "name",
                className: "font-medium", 
                render: (name: string) => {
                  return (
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center">
                        <Avatar >
                          <AvatarFallback>{ getNameAvatar(name) }</AvatarFallback>
                        </Avatar>
                      </div>
                      <span>{ name }</span>
                    </div>
                  )
                }
               },
              { label: "Description", accessor: "description" },
              { label: 'Price', accessor: 'price', render: (price: number) => `$${price}` },
              { label: "Created At", accessor: "createdAt", },
              { label: 'Stock', accessor: 'stock'},
              {
                label: "Actions",
                accessor: "id",
                render: (id: string | number) => (
                  <div className="flex items-center gap-2">
                    <Link href={ `/dashboard/products/${id}` }>
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                ),
              },
            ] }
          />
          <CardFooter>
            <TablePagination />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default ProductsPage