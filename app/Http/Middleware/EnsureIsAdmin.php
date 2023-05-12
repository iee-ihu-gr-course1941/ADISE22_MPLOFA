<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class EnsureIsAdmin {
    /**
     * Handle an incoming request.
     * Ensure the User making a request that passes
     * through this middleware is an Admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next) {
        if($request->user()->isAdmin())
            return $next($request);
        else
            return Redirect::route('home');
    }
}
