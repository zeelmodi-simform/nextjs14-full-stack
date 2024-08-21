'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


type Props = {
    totalCount: number;
}

const TablePagination = ({
    totalCount
}: Props
) => {


    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname()
    
    const currentPage = parseInt(searchParams.get('page') || '1');
    const ITEMS_PER_PAGE = parseInt(searchParams.get('limit') || '10');

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);


    const params = new URLSearchParams(searchParams);

    const paginationRange = () => {
        const siblingCount = 1;
        const totalPageNumbers = siblingCount * 1 + 5;        

        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const showLeftEllipsis = leftSiblingIndex > 2;
        const showRightEllipsis = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        let pages: number[] = [];

        if (!showLeftEllipsis && showRightEllipsis) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

            pages = [...leftRange, -1, totalPages];
        } else if (showLeftEllipsis && !showRightEllipsis) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);

            pages = [firstPageIndex, -1, ...rightRange];
        } else if (showLeftEllipsis && showRightEllipsis) {
            let middleRange = Array.from({ length: siblingCount * 2 + 1 }, (_, i) => leftSiblingIndex + i);
            pages = [firstPageIndex, -1, ...middleRange, -1, lastPageIndex];
        }
        return pages;
    };

    const paginationItems = paginationRange();
    
    const hasPrev = currentPage === 1;
    const hasNext = currentPage === totalPages;

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        
        params.set('page', String(page));
        replace(`${pathname}?${params.toString()}`);
    }

    const handleLimitChange = (limit: string) => {        
        params.set('page', '1');
        params.set('limit', String(limit));
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-between">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            aria-disabled={ hasPrev }
                            tabIndex={ hasPrev ? -1 : undefined }
                            className={ hasPrev ? "hover:bg-transparent pointer-events-none hover:text-muted-foreground text-muted-foreground opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer" }
                            onClick={ () => handlePageChange(currentPage - 1) }
                        />
                    </PaginationItem>
                    { paginationItems.map((page, index) => (
                        <PaginationItem key={ page } >
                            { page === -1 ? (
                                <span>...</span>
                            ) : (
                                <PaginationLink isActive={ page === currentPage } className="hover:cursor-pointer" onClick={ () => handlePageChange(page) }>
                                    { page }
                                </PaginationLink>
                            ) }
                        </PaginationItem>
                    )) }
                    <PaginationItem>
                        <PaginationNext
                            aria-disabled={ hasNext }
                            tabIndex={ hasNext ? -1 : undefined }
                            className={ hasNext ? "hover:bg-transparent pointer-events-none hover:text-muted-foreground text-muted-foreground opacity-50 hover:cursor-not-allowed" : "hover:cursor-pointer" }
                            onClick={ () => handlePageChange(currentPage + 1) }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="text-sm font-medium sm:mr-2">
                            Total: { totalCount }
                        </span>
                    </PaginationItem>
                
                </PaginationContent>
            </Pagination>
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:ml-4">

                <label htmlFor="limit-select" className="text-sm font-medium sm:mr-2">
                    Items per page:
                </label>
                <Select onValueChange={handleLimitChange } value={ ITEMS_PER_PAGE.toString() }>
                    <SelectTrigger className="w-24">
                        <SelectValue placeholder={ITEMS_PER_PAGE.toString()} defaultValue={``} />
                    </SelectTrigger>
                    <SelectContent>
                        { [5, 10, 20, 30, 40, 50].map((limit) => (
                            <SelectItem key={ limit } value={ limit.toString() }>
                                { limit }
                            </SelectItem>
                        )) }
                    </SelectContent>
                </Select>
            </div>
        
        </div>
    );
};

export default TablePagination;