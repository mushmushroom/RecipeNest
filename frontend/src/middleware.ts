// export { default } from 'next-auth/middleware';
// export const config = {
//   matcher: ['/dashboard/:path*'],
// };

import { NextRequest, NextResponse } from 'next/server';
import { AppPathProtected, AppPathPublic } from './lib/constants';

const knownRoutes = [
  AppPathProtected.AddRecipe,
  AppPathProtected.EditRecipe,
  AppPathProtected.Favorites,
  AppPathProtected.MyRecipes,
  AppPathProtected.Settings,
];
function getSessionToken(req: NextRequest) {
  return (
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value
  );
}
const isAuthTokenPresent = (req: NextRequest) => {
  const token = getSessionToken(req);
  return Boolean(token);
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // redirected from protected path, if not logged in
  if (
    Object.values(AppPathProtected).some((path) => pathname.startsWith(path)) &&
    !isAuthTokenPresent(req)
  ) {
    return NextResponse.redirect(new URL(AppPathPublic.Login, req.url));
  }

  // redirect from login/register/verify pages, if logged in
  if (
    isAuthTokenPresent(req) &&
    [AppPathPublic.Login, AppPathPublic.Register, AppPathPublic.Verify].some((p) => pathname === p)
  ) {
    return NextResponse.redirect(new URL(AppPathPublic.Recipes, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/verify',
    '/recipes',
    '/new-recipe',
    '/edit/:path*',
    '/recipes/:path*',
    '/my-recipes/:path*',
    // '/my-recipes/new',
    // '/my-recipes/edit',
    '/favorites',
    '/settings',
  ],
};
