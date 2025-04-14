import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from './lib/schemas/loginSchema';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const validated = loginSchema.safeParse(credentials);
          
          if (!validated.success) {
            return null;
          }

          const { email, password } = validated.data;
          const user = await getUserByEmail(email);

          // Explicit null check for passwordHash
          if (!user?.passwordHash) {
            return null;
          }

          // Safe password comparison
          const isPasswordValid = await compare(password, user.passwordHash);
          if (!isPasswordValid) {
            return null;
          }

          // Return only necessary user data
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            // Add other necessary user fields
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  // Optional: Add these for better configuration
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true
} satisfies NextAuthConfig;