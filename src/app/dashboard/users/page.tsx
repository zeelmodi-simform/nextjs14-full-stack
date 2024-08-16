import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import UsersDataTable from "@/components/UsersDataTable";
import { fetchUsers } from "@/lib/data";
import { IUser } from "@/lib/types";
import Link from "next/link";

type Props = {}

const UsersPage = async (props: Props) => {

  // const [search, setSearch] = useState("")
  // const [currentPage, setCurrentPage] = useState(1)
  // const [usersPerPage] = useState(10)

  const users: IUser[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      createdAt: "2023-04-15",
      role: "Admin",
      status: 'active',
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      createdAt: "2023-03-20",
      role: "User",
      status: 'active',
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      createdAt: "2023-05-01",
      role: "Editor",
      status: 'active',
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      createdAt: "2023-02-10",
      role: "User",
      status: 'passive',
    },
    {
      id: 5,
      name: "Tom Davis",
      email: "tom@example.com",
      createdAt: "2023-06-05",
      role: "Admin",
      status: 'active',
    },
    {
      id: 6,
      name: "Sarah Lee",
      email: "sarah@example.com",
      createdAt: "2023-01-25",
      role: "Editor",
      status: 'active',
    },
    {
      id: 7,
      name: "Michael Brown",
      email: "michael@example.com",
      createdAt: "2023-04-30",
      role: "User",
      status: 'active',
    },
    {
      id: 8,
      name: "Emily Wilson",
      email: "emily@example.com",
      createdAt: "2023-03-15",
      role: "Admin",
      status: 'active',
    },
    {
      id: 9,
      name: "David Taylor",
      email: "david@example.com",
      createdAt: "2023-05-20",
      role: "Editor",
      status: 'active',
    },
    {
      id: 10,
      name: "Olivia Anderson",
      email: "olivia@example.com",
      createdAt: "2023-02-28",
      role: "User",
      status: 'active',
    },
    {
      id: 11,
      name: "Christopher Martinez",
      email: "christopher@example.com",
      createdAt: "2023-06-10",
      role: "Admin",
      status: 'passive',
    },
    {
      id: 12,
      name: "Isabella Hernandez",
      email: "isabella@example.com",
      createdAt: "2023-01-18",
      role: "Editor",
      status: 'active',
    },
  ];
    
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

  const usersList = await fetchUsers();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Header title="Users" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">          
          <SearchBar placeholder="Search users..." value={ '' } onChange={ handleSearch } />
          <Link href={ `/dashboard/users/add` }>
            <Button>Create New User</Button>
          </Link>
        </div>
        <UsersDataTable users={users} />
      </div>
    </main>
  );
};

export default UsersPage