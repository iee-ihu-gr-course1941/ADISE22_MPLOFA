<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use function PHPUnit\Framework\isNull;

class RegisteredUserController extends Controller {
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create($refId) {

        return Inertia::render('Auth/Login_Register',[
            'Active' => 'Register',
            'RefId' => $refId,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $input = $request->only(['name','email','password','iee','refUserID']);
        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'isIEE' => $input['iee'],
            'refUser' => $input['refUserID'] ?? null,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function edit(Request $request) {
        $User = $request->user();
        $input = $request->only(['Name','Email']);
        if($User->name !== $input['Name'])
            $User->name = $input['Name'];
        if($User->email !== $input['Email'])
            $User->name = $input['Email'];

        $User->save();
    }

    public function destroy(Request $request) {
        $input = $request->only(['userID']);
        if(isset($input['userID'])){
            $User = User::find($input['userID']);
            if(!is_null($User) && !$User->isAdmin())
                $User->delete();
        }
        return back();
    }
}
