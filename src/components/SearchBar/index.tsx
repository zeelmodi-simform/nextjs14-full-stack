import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

type Props = {
    placeholder: string
}

const SearchBar = ({ placeholder }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder={ placeholder }
                    //   value={search}
                    //   onChange={handleSearch}
                    className="pl-8 sm:w-[300px] md:w-[400px]"
                />
            </div>
        </div>
    );
};

export default SearchBar