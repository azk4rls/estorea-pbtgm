//auth loh ya rek
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth} = NextAuth({
  providers: [  
   Google,

    Credentials({
      credentials: {
         email: {label: "Email",type: "email"},
         password: {label: "password",type: "password"},
      },
      async authorize (credentials) {
         const user = await getUserFromDB(credentials.email, credentials.password)
         if (!user) return null
         return user;
      },
      }),
   ],

   callbacks: {
       async session({session, token}) {
         session.user.id = token.sub as string;
         return session;
       },
       async jwt({token, user}) {
         if (user) token.sub = user.id;
         return token;
       },
   },
   pages: {
       signIn: "/login",
   },
   })