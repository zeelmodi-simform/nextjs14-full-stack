import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from "./auth.config";


import { login } from "./lib/data";


export const {auth,signIn,signOut} = NextAuth({
   
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials, request) {
                try {
                    console.log({credentials});
                    
                    if (!credentials) {
                        throw new Error("Credentials are missing");
                    }

                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    return null
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.email = user.email;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username;      
                // session.email = token.email;
            }
            return session
        }
    }
});