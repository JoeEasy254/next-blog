import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatePagesProps {
  currentPage: number;
  totalPages: number;
  handleNext: () => void;
  handlePrevious: () => void;
}

export default function PaginatePages({
  currentPage,
  totalPages,
  handleNext,
  handlePrevious,
}: PaginatePagesProps) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                if (page !== currentPage) handleNext();
                handlePrevious();
              }}
              className={`${currentPage === page ? "bg-blue-500" : ""}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
