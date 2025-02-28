import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { verifyPassword } from "@/functions/loginFunction";

const options = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await verifyPassword(
          credentials.username,
          credentials.password
        );
        console.log(user);
        if (user) {
          return { 
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
            username: user.username,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id || user.sub;
        token.name = user.name;
        token.lastname = user.lastname;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({session, token}) {
      if (token.id) {
        session.user = { 
          id: token.id,
          name: token.name,
          lastname: token.lastname,
          role: token.role,
          username: token.username,
        };
      } else {
        console.error("Token ID is undefined");
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/iniciar-sesion",
  },
};

// Exporta un named export para el método GET
export const GET = async (req, res) => {
  return await NextAuth(req, res, options);
};

// Exporta un named export para el método POST
export const POST = async (req, res) => {
  return await NextAuth(req, res, options);
};
