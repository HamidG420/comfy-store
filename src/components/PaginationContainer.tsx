import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { LoaderData } from '../utils';
import { productsLoader } from '../pages/Products';
import queryClient from '../queryClient';

const PaginationContainer = () => {
  const loader = productsLoader(queryClient);
  const { meta } = useLoaderData() as LoaderData<typeof loader>;
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const onPageChangeHandler = function (pageNumber: number) {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

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
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChangeHandler(pageNumber)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === page ? 'bg-base-300 border-base-300' : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}
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
export default PaginationContainer;
