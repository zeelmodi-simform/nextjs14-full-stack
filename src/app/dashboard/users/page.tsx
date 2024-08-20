import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import UsersDataTable from "@/components/UsersDataTable";
import { fetchUsers } from "@/lib/data";
import { IUser } from "@/lib/types";
import Link from "next/link";

type Props = {}

const UsersPage = async ({searchParams} : {searchParams: { search: string}}) => {

  // const [search, setSearch] = useState("")
  // const [currentPage, setCurrentPage] = useState(1)
  // const [usersPerPage] = useState(10)

    
  // const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
  // const indexOfLastUser = currentPage * usersPerPage
  // const indexOfFirstUser = indexOfLastUser - usersPerPage
  // const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  // const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const handlePageChange = (pageNumber: number) => {
    // setCurrentPage(pageNumber)
  }
  const handleSearch = () => {
    // setSearch(e.target.value)
    // setCurrentPage(1)
  }  

  const searchTerm = searchParams.search || '';  

  const users: IUser[] = await fetchUsers(searchTerm);
  
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
        <UsersDataTable users={JSON.parse(JSON.stringify(users))} />
      </div>
    </main>
  );
};

export default UsersPage