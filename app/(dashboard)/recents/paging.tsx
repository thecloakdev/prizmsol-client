import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Paging({
    currentPage = 1,
    totalPages = 1,
    slug = "/"
}: {
    pages?: number;
    currentPage?: number;
    totalPages?: number;
    slug?: string;
}) {
    const renderPageNumbers = () => {
        return [...Array(totalPages)].map((_, index: number) => {
            return (
                <PaginationItem key={index}>
                    <PaginationLink
                        href={`${slug}/${index + 1}`}
                        isActive={index + 1 == currentPage}
                        className="cursor-default"
                    >
                        {index + 1}
                    </PaginationLink>
                </PaginationItem>
            );
        });
    }
    return (
        <Pagination className="w-full mt-10">
            <PaginationContent>
                {currentPage > 1 && <PaginationItem>
                    <PaginationPrevious className="cursor-default" href={`${slug}/${currentPage - 1}`} />
                </PaginationItem>}
                {renderPageNumbers()}
                {(totalPages > 1 && currentPage != totalPages) && <PaginationItem>
                    <PaginationNext className="cursor-default" href={`${slug}/${currentPage + 1}`} />
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    );
}