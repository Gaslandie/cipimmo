"use client";
import React, { useCallback } from "react";

type PaginationProps = {
    itemLength?: number;
    itemPerPage?: number;
    setPage?: (num: number) => void;
    currentPage: number;
};

export default function Pagination({
    itemLength = 200,
    itemPerPage = 10,
    setPage = () => {},
    currentPage,
}: PaginationProps) {
    const totalPages = Math.ceil(itemLength / itemPerPage);

    const handlePageClick = useCallback(
        (page: number) => {
            if (page > 0 && page <= totalPages && page !== currentPage) {
                setPage(page);
            }
        },
        [totalPages, currentPage, setPage]
    );

    const handlePreviousClick = useCallback(() => {
        handlePageClick(currentPage - 1);
    }, [handlePageClick, currentPage]);

    const handleNextClick = useCallback(() => {
        handlePageClick(currentPage + 1);
    }, [handlePageClick, currentPage]);

    const handleFirstPageClick = useCallback(() => {
        handlePageClick(1);
    }, [handlePageClick]);

    const handleLastPageClick = useCallback(() => {
        handlePageClick(totalPages);
    }, [handlePageClick, totalPages]);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: number[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pages.filter((p) => p > 0 && p <= totalPages);
    };

    const pageNumbers = getPageNumbers();

    return (
        <ul className="wg-pagination">
            {/* Previous button */}
            <li>
                <button type="button" className="nav-item" aria-label="Page précédente" disabled={currentPage <= 1} onClick={handlePreviousClick}><i className="icon-CaretLeft" aria-hidden="true" /></button>
            </li>
            {/* First page and leading ellipsis */}
            {totalPages > 5 && currentPage > 3 && (
                <>
                    <li>
                        <button type="button"
                            className={`nav-item ${
                                currentPage === 1 ? "active" : ""
                            }`}
                            onClick={handleFirstPageClick}
                        >
                            1
                        </button>
                    </li>
                    {currentPage > 4 && (
                        <li>
                            <span className="nav-item">...</span>
                        </li>
                    )}
                </>
            )}
            {/* Page numbers */}
            {pageNumbers.map((page) => (
                <li key={page}>
                    <button type="button"
                        className={`nav-item ${
                            currentPage === page ? "active" : ""
                        }`}
                        aria-current={currentPage === page ? "page" : undefined} aria-label={`Page ${page}`} onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                </li>
            ))}
            {/* Trailing ellipsis and last page */}
            {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                    {currentPage < totalPages - 3 && (
                        <li>
                            <span className="nav-item">...</span>
                        </li>
                    )}
                    <li>
                        <button type="button"
                            className={`nav-item ${
                                currentPage === totalPages ? "active" : ""
                            }`}
                            onClick={handleLastPageClick}
                        >
                            {totalPages}
                        </button>
                    </li>
                </>
            )}
            {/* Next button */}
            <li>
                <button type="button" className="nav-item" aria-label="Page suivante" disabled={currentPage >= totalPages} onClick={handleNextClick}><i className="icon-CaretRight" aria-hidden="true" /></button>
            </li>
        </ul>
    );
}
