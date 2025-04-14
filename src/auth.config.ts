import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from './lib/schemas/loginSchema';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';

export default {
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);
        
        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);

          // Add explicit null check for passwordHash
          if (!user || !user.passwordHash) {
            return null;
          }

          // Now we know passwordHash is definitely a string
          const passwordsMatch = await compare(password, user.passwordHash);
          
          if (!passwordsMatch) {
            return null;
          }

          // Return only necessary user data (without passwordHash)
          return {
            id: user.id,
            email: user.email,
            name: user.name
            // Include any other user fields you need in the session
          };
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig;