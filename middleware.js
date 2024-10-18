// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   console.log(request.nextUrl.pathname);
//   if (request.nextUrl.pathname.startsWith("/")) {
//     return NextResponse.rewrite(new URL("/user/login", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
