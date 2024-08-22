import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import UsersDataTable from "@/components/UsersDataTable";
import { fetchUsers } from "@/lib/data";
import Link from "next/link";

type Props = {}

const UsersPage = async ({searchParams} : {searchParams: { search: string, page: number, limit?: number}}) => {


  const searchTerm = searchParams.search || '';  
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 5;

  const { users, totalCount } = await fetchUsers(searchTerm, page, limit);
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Header title="Users" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">          
          <SearchBar placeholder="Search users..." />
          <Link href={ `/dashboard/users/add` }>
            <Button>Create New User</Button>
          </Link>
        </div>
        <UsersDataTable users={JSON.parse(JSON.stringify(users))} totalCount={totalCount} />
      </div>
    </main>
  );
};

export default UsersPage