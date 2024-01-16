import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&response_type=code',
    }),
  ],
  async session({ session }) {},

  async signIn({ profile }) {
    try {
        await connectToDB();
        // Check if user already exists in the database

        // if not, create a new user

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
},
});

export { handler as GET, handler as POST };
