<?php

namespace App\Http\Controllers;

use App\Http\Resources\BugResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\UserResource;
use App\Models\Bug;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class AdminController extends Controller {

    public function show(Request $request) {
        $input = $request->only(['rating','iees']);
        $IEE = User::where('isIEE',true)->count();
        $Bugs = BugResource::collection(Bug::paginate(2,['*'],'BugsPage')->appends(request()->except('BugsPage')));
        $InviteLink = URL::route('register', ['refId' => $request->user()->id]);
        $Users = UserResource::collection((isset($input['iees']) && $input['iees']==="true")
            ?
//            Showing only Users that are IEEs if $input['iees'] is set and true.
                User::where('isIEE',true)->paginate(3,['*'],'UsersPage')->appends(request()->except('UsersPage'))
            :
//            Showing all Users if $input['iees'] is not set or if it is set and is false.
                User::paginate(3,['*'],'UsersPage')->appends(request()->except('UsersPage')));

        $Reviews = ReviewResource::collection((
            isset($input['rating'])
                ?
                ($input['rating'] === 'All')
                    ?
                Review::paginate(2,['*'],'ReviewsPage')->appends(request()->except('ReviewsPage'))
                    :
                Review::where('rating',$input['rating'])->paginate(2,['*'],'ReviewsPage')->appends(request()->except('ReviewsPage'))
        : Review::paginate(2,['*'],'ReviewsPage')->appends(request()->except('ReviewsPage'))));
        return Inertia::render('AdminPanel',['Users'=>$Users,'Reviews' => fn ()=>$Reviews,'Bugs'=>$Bugs,
            'IEEs'=>$IEE, 'InviteLink'=>$InviteLink]);
    }
}
