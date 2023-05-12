import uuid from "react-uuid";
import {usePagination} from "../Hooks/usePagination";
import Card from "../Game Components/Card";

export function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if(currentPage !== paginationRange.length)
            onPageChange(currentPage + 1);
        else
            onPageChange(paginationRange[0]);
    };

    // const onPrevious = () => {
    //     if(currentPage !== 1)
    //         onPageChange(currentPage - 1);
    // };
    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <>
        <Card key={uuid()} card={"🂠"} size={'1'} Enemy={true} isPagination={true}
            handleClick={onNext} color={'white'} className={'pb-2 mb-2 mb-xxl-2'}>
        </Card>
        </>)

}

