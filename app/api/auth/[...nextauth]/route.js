import User from '@models/user';
import { connectToDB } from '@utils/database';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch {
        return { ...session, errorMessage: 'Failed to fetch user' };
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        // Check if user already exists in the database
        const existingUser = await User.findOne({ email: profile.email });

        // if user does not exist, create a new user
        if (!existingUser) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
