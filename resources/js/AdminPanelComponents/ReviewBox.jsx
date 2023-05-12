import StarRating from "../Components/StarRating";

export function ReviewBox({Review}) {
    const BackgroundColor = {
        0:'#a11313',
        1:'#aa2a2a',
        2:'#b34242',
        3:'#d0ea40',
        4:'#9dec7b',
        5:'#50e710',
    };
    return (
        <div className={'card w-100 '}>
            <div className={'card-header border-bottom-0 bg-transparent'} style={{color:(Review.user === 'User is Inactive !' ? '#A9A9A9' : BackgroundColor[Review.rating])}}>
                <div className="fw-bold">
                    {Review.user}
                </div>
            </div>
            <div className={'card-body'}>
                <div className={'row w-100'}>
                    <div className={'col-12 col-lg-6'}>
                        <div className="ms-2 me-auto">
                            <div className={'row pb-0 pt-2'}>
                                {/*<div className={'col-12'}>*/}
                                <strong>Rating</strong>
                                <StarRating Rating={Review.rating} readOnly={true}></StarRating>
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-lg-6 text-center'}>
                        <strong>Comment</strong>
                        <p className={'h-50 text-center'} style={{overflowY:"scroll"}}>{Review.comment}</p>
                    </div>
                </div>
            </div>
            <div className={'card-footer bg-transparent'}>
                <strong>Placed</strong>
                <p>{Review.placed}</p>
            </div>
        </div>
    )
}
