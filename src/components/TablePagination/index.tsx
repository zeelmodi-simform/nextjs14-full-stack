
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";


type Props = {
    handlePageChange: any;
    currentPage: number;
    totalPages: number;
}

const TablePagination = ({
    handlePageChange,
    currentPage,
    totalPages
}: Props
) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        disabled={ currentPage === 1 }
                        onClick={ () => handlePageChange(currentPage - 1) }
                    />
                </PaginationItem>
                { Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={ page }>
                        <PaginationLink href="#" isActive={ page === currentPage } onClick={ () => handlePageChange(page) }>
                            { page }
                        </PaginationLink>
                    </PaginationItem>
                )) }
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        disabled={ currentPage === totalPages }
                        onClick={ () => handlePageChange(currentPage + 1) }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination