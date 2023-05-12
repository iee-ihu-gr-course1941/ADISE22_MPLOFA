import StarRating from "../Components/StarRating";
import {Link} from "@inertiajs/inertia-react";
import uuid from "react-uuid";
import {useState} from "react";
import {Pagination} from "./Pagination";
import {ReviewBox} from "./ReviewBox";

export function Reviews({Reviews}) {
    const [searching,setSearching] = useState(false);
    const RatingOptions = [1,2,3,4,5].map((number)=> {
        return <Link key={number} href={route('AdminPanel')}  as={'button'} only={['Reviews']} name="btnradio" data={{rating:number}}
                     className={"btn btn-outline-secondary mt-4 btn-sm"} type="button" onClick={()=>setSearching(true)}
                     preserveState={true} preserveScroll={true}>
            {number} <span key={uuid()} className="star" style={{fontSize:"medium",color:'#ffea00'}}>&#9733;</span>
        </Link>
    });

    const ReviewList = Reviews.data.map((Review)=>{
        return <li key={Review.id} className="list-group-item d-flex justify-content-between align-items-start pb-2 pt-2 w-100">
            <ReviewBox Review={Review}></ReviewBox>
        </li>
    });
    return (
            <div className={'text-center mt-md-5 mt-4 mt-sm-5 mt-lg-0'}>
                <div className={'card h-50'}>
                    <div className={'card-header text-center'}>
                        <h5>Reviews</h5>
                        <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                            <Link key={'all'} href={route('AdminPanel')}  as={'button'} only={['Reviews']} name="btnradio" data={{rating:'All'}}
                                  className={"btn btn-outline-secondary mt-4 "} type="button" onClick={()=>setSearching(false)} preserveState={true}>
                                All
                            </Link>
                            {RatingOptions}
                        </div>
                    </div>
                    <div className={'card-body overflow-auto h-50'}>
                        <ul className="list-group list-group-flush text-center align-items-center">
                            {
                                Reviews.data.length !==0
                                    ?
                                ReviewList
                                    :
                                <li key={'none'} className="list-group-item">
                                    {
                                        searching
                                            ?
                                        'No reviews matching your criteria!'
                                            :
                                        'Nobody has submitted a review yet!'
                                    }
                                </li>
                            }
                        </ul>
                        <Pagination links={Reviews} className={''}></Pagination>
                    </div>
                </div>
            </div>
    )
}
