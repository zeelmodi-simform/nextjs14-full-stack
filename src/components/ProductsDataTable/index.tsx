'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '../DataTable/index';

import TablePagination from '@/components/TablePagination';
import { deleteProduct } from '@/lib/actions';
import { formatDate } from '@/lib/formatData.util';
import { IProduct } from '@/lib/types';

type Props = {
    products: IProduct[];
    totalCount: number
}

const ProductsDataTable = ({ products, totalCount }: Props) => {
    
  const getNameAvatar = (name: string) => {
    const nameArray = name?.split(" ")
    return nameArray?.map((word) => word.charAt(0).toUpperCase()).join("")
  }

  return (
    <Card>
      <DataTable
        rowKey='_id'
        data={ products }
        columns={ [
          {
            label: "Title",
            accessor: "title",
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
          { label: "Created At", accessor: "createdAt", render: (date: any) => <span>{ formatDate(date) }</span> },
          { label: 'Stock', accessor: 'stock' },
          {
            label: "Actions",
            accessor: "_id",
            render: (id: string | number) => (
              <div className="flex items-center gap-2">
                <Link href={ `/dashboard/products/${id}` }>
                  <Button variant="ghost" size="icon">
                    <EyeIcon className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={id} />
                  <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/10">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </form>
              </div>
            ),
          },
        ] }
      />
      <CardFooter>
        <TablePagination totalCount={ totalCount } />
      </CardFooter>
    </Card>
  )
};

export default ProductsDataTable