'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { IUser } from '@/lib/types';
import { EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '../DataTable/index';
import TablePagination from '../TablePagination/index';

type Props = {
    users: IUser[]
}

const UsersDataTable = ({ users }: Props) => {

    const getNameAvatar = (name: string) => {
        const nameArray = name.split(" ")
        return nameArray.map((word) => word.charAt(0).toUpperCase()).join("")
    }

    const handlePageChange = (pageNumber: number) => {
        // setCurrentPage(pageNumber)
    }

    return (
        <Card>
            <DataTable
                data={ users }
                columns={ [
                    {
                        label: "Name",
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
                    { label: "Email", accessor: "email" },
                    { label: "Created At", accessor: "createdAt", },
                    {
                        label: "Role",
                        accessor: "role",
                        render: (role: string) => <Badge variant={ role === "Admin" ? "primary" : "secondary" }>{ role }</Badge>,
                    },
                    {
                        label: "Status",
                        accessor: "status",
                        render: (status: string) => <Badge variant={ status === "active" ? "success" : "destructive" }>{ status }</Badge>,
                    },
                    {
                        label: "Actions",
                        accessor: "id",
                        render: (id: string | number) => (
                            <div className="flex items-center gap-2">
                                <Link href={ `/dashboard/users/${id}` }>
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
                <TablePagination currentPage={ 1 } totalPages={ 5 } handlePageChange={ handlePageChange } />
            </CardFooter>
        </Card>
    );
};

export default UsersDataTable