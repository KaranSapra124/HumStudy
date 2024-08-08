export const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const maxVisiblePages = 10; // Define the maximum number of visible page numbers
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  const startPage =
    currentPage <= halfMaxVisiblePages ? 1 : currentPage - halfMaxVisiblePages;
  const endPage =
    startPage + maxVisiblePages - 1 > nPages
      ? nPages
      : startPage + maxVisiblePages - 1;

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    window.scroll(0,0)
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav style={{ margin: "auto" }}>
      <ul className="pagination flex flex-wrap">
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToPrevPage}
            href="#"
            disabled={currentPage === 1}
          >
            Previous
          </a>
        </li>
        {currentPage > halfMaxVisiblePages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {renderPageNumbers().map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item bg-purple-700 ${
              currentPage === pgNumber ? "active" : ""
            } `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        {currentPage + halfMaxVisiblePages < nPages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToNextPage}
            href="#"
            disabled={currentPage === nPages}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
