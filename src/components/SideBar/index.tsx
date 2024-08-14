import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ISideBarItem } from '@/lib/types';
import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import MenuLink from '../MenuLink';

type Props = {}

const SideBarItems: ISideBarItem[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    path: "/orders",
    title: "Orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    badge: 6,
  },
  {
    path: "/dashboard/products",
    title: "Products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    path: "/dashboard/users",
    title: "Customers",
    icon: <Users className="h-4 w-4" />,
  },
  {
    path: "/analytics",
    title: "Analytics",
    icon: <LineChart className="h-4 w-4" />,
  },
]

const SideBar = (props: Props) => {

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {SideBarItems.map((item, index) => (
              <MenuLink item={item} key={item.path} /> 
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SideBar