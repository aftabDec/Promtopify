import { connectToDb } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRETE,
  callbacks: {
    async session({ session }) {
      await connectToDb(); // Call the database connection here

      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      } else {
        console.log("User not found during session callback");
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDb(); // Call the database connection here

        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          await User.create({
            email: profile.email,
            image: profile.picture,
            username: profile.name.replace(" ", "").toLowerCase(),
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
