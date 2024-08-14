'use client'

import { Badge } from '@/components/ui/badge';
import { ISideBarItem } from '@/lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


type Props = {
    item: ISideBarItem
}

const MenuLink = ({ item }: Props) => {
    
    const pathname = usePathname();


    return (
        <Link
            key={ item.path }
            href={ item.path }
            className={ `flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${pathname === item.path ? 'bg-muted text-primary' : 'text-muted-foreground'}` }
        >
            { item.icon }
            { item.title }
            { item.badge && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    { item.badge }
                </Badge>
            ) }
        </Link>
    )
};

export default MenuLink