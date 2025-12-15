import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { headers } from "next/headers";
import * as schema from '../db/schemas';

console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
console.log("GITHUB_CLIENT_SECRET:", !!process.env.GITHUB_CLIENT_SECRET);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },

  socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        }, 
    },

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
});

export const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
};
