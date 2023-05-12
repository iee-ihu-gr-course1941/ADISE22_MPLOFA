import {Link} from "@inertiajs/inertia-react";
import {useAdminPagination} from "../Hooks/useAdminPagination";
import uuid from "react-uuid";

export function Pagination({ links,className }) {
    const OrderLinks = links.links,
        Meta = links.meta;
    // console.log("Links",Meta)
    const totalCount = Meta.total,
        pageSize = Meta.per_page,
        siblingCount = 1,
        currentPage = Meta.current_page,
    paginationRange = useAdminPagination({totalCount,pageSize,
    siblingCount,currentPage});


    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 1) {
        return null;
    }

    function getUrl(label) {
        let returnlink = "";
        Meta.links.forEach((link)=> {
            if(link.label === label){
                returnlink = link.url;
            }
        })
        return returnlink;
    }
    return (
        links.meta.links.length > 3 && (
            <nav aria-label="Page navigation" className={'text-center '}>
                <ul className={"pagination justify-content-center"}>
                    {/*<li key={'first'} className={"page-item w-auto " + (currentPage === 1 ? ' disabled' : '')}>*/}
                    {/*    <Link className={'page-link '} href={Meta.links[0].url} preserveState={true}>*/}
                    {/*         &laquo;*/}
                    {/*        /!*Prev*!/*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li key={'previous'} className={"page-item w-auto " + (currentPage === 1 ? ' disabled' : '')}>
                        <Link className={'page-link px-2'} href={Meta.links[0].url} preserveState={true}>
                            &larr;
                            {/*Prev*/}
                        </Link>
                    </li>
                    {
                        paginationRange.map((link) => {
                                return  <li key={link === '...' ? uuid() : link} className={"page-item " + (link === currentPage ? 'active ' : '')
                                    + (link === '...' ? 'disabled' : '')}>
                                    <Link className={'page-link'} href={getUrl(link.toString())} preserveState={true}>
                                        {link}
                                    </Link>
                                </li>
                        })
                    }
                    <li key={'next'} className={"page-item " + (currentPage === Meta.last_page ? ' disabled' : '')}>
                        <Link className={'page-link px-2'} href={ Meta.links[Meta.links.length-1].url} preserveState={true}>
                           {/*Next*/}
                            &rarr;
                        </Link>
                    </li>
                    {/*<li key={'next'} className={"page-item " + (currentPage === Meta.last_page ? ' disabled' : '')}>*/}
                    {/*    <Link className={'page-link'} href={ Meta.links[Meta.links.length-1].url} preserveState={true}>*/}
                    {/*       /!*Next*!/*/}
                    {/*        &raquo;*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                </ul>
                <h6>Showing {Meta.from} - {Meta.to} of {Meta.total}</h6>
            </nav>
        )
    );
}
