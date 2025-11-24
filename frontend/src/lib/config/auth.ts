import { BACKEND_URL } from '@/lib/constants';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to refresh token');
    }

    const response = await res.json();

    if (response.data?.backendTokens) {
      return {
        ...token,
        backendTokens: response.data.backendTokens,
        user: response.data.user,
      };
    }

    return {
      ...token,
      backendTokens: response.backendTokens || response.data,
    };
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'jsmith@dg.dfg',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        // Wrong credentials
        if (!data.success && data.message === 'User not found') {
          throw new Error('INVALID_CREDENTIALS');
        }

        // Not verified
        if (!data.success && data.verified === false) {
          throw new Error('UNVERIFIED_USER');
        }

        if (!data.success) {
          throw new Error(data.message || 'Something went wrong. Try again later.');
        }

        return data.data;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      console.log(token);
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};
