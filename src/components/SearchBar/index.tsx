'use client'

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
    placeholder: string
}

const SearchBar = ({ placeholder }: Props) => {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)

        const val = e.target.value.trim()
        params.set('page', '1')
        if (val.length) {
            val.length > 2 && params.set('search', val)
        }
        else {
            params.delete('search')
        }
        replace(`${pathname}?${params}`)
    }, 300)
    

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder={ placeholder }
                    onChange={ handleSearch }
                    defaultValue={searchParams.get('search')?.toString() || ''}
                    className="pl-8 sm:w-[300px] md:w-[400px]"
                />
            </div>
        </div>
    );
};

export default SearchBar