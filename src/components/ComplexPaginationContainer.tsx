import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { LoaderData } from '../utils';
import { ordersLoader } from '../pages/Orders';
import store from '../store';
import queryClient from '../queryClient';

const ComplexPaginationContainer = () => {
  const loader = ordersLoader(store, queryClient);
  const { meta } = (useLoaderData() as LoaderData<typeof loader>)!;
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const onPrevClickBtnHandler = function () {
    let prevPage = page - 1;
    if (prevPage < 1) prevPage = pageCount;
    onPageChangeHandler(prevPage);
  };

  const onNextClickBtnHandler = function () {
    let nextPage = page + 1;
    if (nextPage > pageCount) nextPage = 1;
    onPageChangeHandler(nextPage);
  };

  const onPageChangeHandler = function (pageNumber: number) {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = function ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) {
    return (
      <button
        key={pageNumber}
        onClick={() => onPageChangeHandler(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = function () {
    const pageButtons: JSX.Element[] = [];
    //  First Button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    if (page > 2) {
      // Dots
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    // Active/Current Page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    if (page < pageCount - 1) {
      // Dots
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }

    //  Last Button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={onPrevClickBtnHandler}
        >
          Prev
        </button>

        {renderPageButtons()}

        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={onNextClickBtnHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ComplexPaginationContainer;
