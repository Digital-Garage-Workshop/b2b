import { serverAuthRepository } from "@/_services";
import NextAuth from "next-auth";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


declare module "next-auth" {
    interface User {
        token?: string;
        id: string; // Ensure id is not nullable
        expiresAt?: number;
      }

  interface Session {
    user: {
      phone?: string | number;
      token?: string;
      accessToken?: string;
      id?: string;
      expiresAt?: number;
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    id?: string;
    refreshToken?: string;
    expiresAt?: number; 
  }
}

export const authOptions: NextAuthOptions = {
  // debug: true,
  providers: [
    Credentials({
      name: "login",
      id: "login",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const userCredential = await serverAuthRepository.login(
            credentials.email,
            credentials.password
          );
          const expirationDate = Date.now() / 1000 + 3600 * 24 * 14;
          console.log(userCredential,'credential');
          return {
            token: userCredential.data?.token,
            expiresAt: expirationDate,
            email: userCredential.data?.email,
            name: userCredential.data?.name,
            image:userCredential.data?.image_url,
            id: userCredential.data?.id || "fallback-id",
            // id: userCredential.data?.image_url || "fallback-id",
          };

        } catch (e: any) {
          console.error("CredentialsProvider authorize error:", e);
          throw new Error(e.message || "Invalid email or password");
        }
      },
    }),

    Credentials({
      name: "signUp",
      id: "signUp",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
        companyRegNum:{label:'employeeName', type:'string', required:false},
        companyLocation:{label:'employeeName', type:'string', required:false},  
        employeeName:{label:'employeeName', type:'string', required:true},
        employeePosition:{label:'employeeName', type:'string', required:true},  
        phoneNumber:{label:'employeeName', type:'string', required:true},  
        type:{label:'type', type:'string', required:true}, 
        companyName:{label:'companyName', type:'string', required:false},   
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const userCredential = await serverAuthRepository.register(
            credentials?.email,
            credentials?.password,
            credentials?.companyLocation,
            credentials?.companyRegNum,
            credentials?.employeeName,
            credentials?.employeePosition,
            credentials?.phoneNumber,
            credentials?.type,
            credentials?.companyName
          );
          // createUserWithEmailAndPassword(
          //   auth,
          //   credentials.email,
          //   credentials.password
          // );
          if (userCredential.data) {
            // const loginResponse: SignUpResponse =
            //   // await serverAuthRepository.signUp({
            //   //   email: userCredential.data.email!,
            //   //   // uuid: userCredential.data.uid,
            //   //   name: userCredential.data?.name,
            //   //   provider: userCredential.providerId?.toString(),
            //   //   image: userCredential.user.photoURL,
            //   // });

            // Add expiration date to the response
            const expirationDate = Date.now() / 1000 + 3600 * 24 * 14; 

            return {
            token: userCredential.data?.token,
            expiresAt: expirationDate,
            email: userCredential.data?.email,
            name: userCredential.data?.name,
            phone: userCredential.data?.phone,
            // image:userCredential.data?.image_url,
            id: userCredential.data?.id||'fallback_url', // Add
            };
          } else {
            return null;
          }
        } catch (e: any) {
          console.error("CredentialsProvider authorize error:", e);
          throw new Error(e.message || "Invalid email or password");
        }
      },
    }),

    Credentials({
      name: "changePass",
      id: "changePass",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
        confirm_password: {
          label: "confirm_password",
          type: "confirm_password",
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const userCredential = await serverAuthRepository.changePass(
            credentials?.email,
            credentials?.password,
            credentials?.confirm_password
          );

          if (userCredential.data) {
            const expirationDate = Date.now() / 1000 + 3600 * 24 * 14;

            return {
              token: userCredential.data?.token,
              expiresAt: expirationDate,
              email: userCredential.data?.email,
              name: userCredential.data?.name,
              phone: userCredential.data?.phone,
              image:userCredential.data?.image_url,
            //   id: userCredential.data?.image_url, 
            id:userCredential.data?.id||'fallback_url',
            };
          } else {
            return null;
          }
        } catch (e: any) {
          console.error("CredentialsProvider authorize error:", e);
          throw new Error(e.message || "Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.expiresAt = user.expiresAt; // Store expiration time in JWT

        if (user.token) {
          token.refreshToken = user.token as string; // Or store the refresh token separately
        }
      }

      // Check if the access token is expired (you can set expiration time logic)
      // const isTokenExpired =
      //   token?.accessToken &&
      //   Date.now() / 1000 >
      //     (typeof token?.expiresAt === "number" ? token.expiresAt : 0);

      // if (isTokenExpired && token?.refreshToken) {
      //   // If token is expired, attempt to refresh it
      //   try {
      //     const refreshTokenResponse: any =
      //       await serverAuthRepository.refreshToken(
      //         token.refreshToken as string
      //       );
      //     if (refreshTokenResponse.token) {
      //       token.accessToken = refreshTokenResponse.token; // Update access token with the new one
      //       token.expiresAt =
      //         Date.now() / 1000 + refreshTokenResponse.data.expiresIn; // Update expiration time
      //     }
      //   } catch (error) {
      //     console.error("Error refreshing token:", error);
      //   }
      // }
      if (!token.accessToken) {
        // deleteCookie("token");
        // deleteCookie("next-auth.session-token");
      }
      return token;
    },
    // async session({session, token}) {
    //   if (token?.accessToken) {
    //     session.user.accessToken = token.accessToken as string;
    //   }
    //   if (token?.id) {
    //     session.user.id = token.id as string;
    //   }
    //   if (token?.expiresAt) {
    //     session.user.expiresAt = token.expiresAt as number; // Add expiration date to session
    //   }
    //   return session;
    // },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.user.accessToken = token.accessToken as string;
      }
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.expiresAt) {
        session.user.expiresAt = token.expiresAt as number; // Add expiration date to session
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  
};

export default NextAuth(authOptions);