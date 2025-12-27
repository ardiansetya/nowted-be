import { db } from "@/db/db";
import { sendEmailVerificationEmail } from "@client/lib/emails/sendEmailVerificationEmail";
import { sendPasswordResetEmail } from "@client/lib/emails/sendPasswordResetEmail";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ["http://localhost:5173"],
  plugins: [openAPI()],

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailVerificationEmail({ user, url });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  emailAndPassword: {
    // requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({ user, url });
    },
    enabled: true,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },

  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
