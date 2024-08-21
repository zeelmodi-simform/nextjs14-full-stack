'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { formatDate } from '@/lib/formatData.util';
import { IUser } from '@/lib/types';
import { EyeIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '../DataTable/index';
import TablePagination from '../TablePagination/index';

type Props = {
    users: IUser[];
    totalCount: number
}

const UsersDataTable = ({ users, totalCount }: Props) => {    

    const getNameAvatar = (name: string) => {
        const nameArray = name?.split(" ")
        return nameArray?.map((word) => word.charAt(0).toUpperCase()).join("")
    }

    return (
        <Card>
            <DataTable
                rowKey='_id'
                data={ users }
                columns={ [
                    {
                        label: "Name",
                        accessor: "username",
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
                    { label: "Created At", accessor: "createdAt", render: (date: any) => <span>{ formatDate(date) }</span> },
                    {
                        label: "Role",
                        accessor: "isAdmin",
                        render: (isAdmin: string) => <Badge variant={ isAdmin ? "primary" : "secondary" }>{ isAdmin ? 'Admin' : 'Client' }</Badge>,
                    },
                    {
                        label: "Status",
                        accessor: "isActive",
                        render: (isActive: string) => <Badge variant={ isActive ? "success" : "destructive" }>{ isActive ? 'active' : 'passive' }</Badge>,
                    },
                    {
                        label: "Actions",
                        accessor: "_id",
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
                <TablePagination totalCount={ totalCount } />
            </CardFooter>
        </Card>
    );
};

export default UsersDataTable