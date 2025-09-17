import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const providers = [] as any[];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
	providers.push(
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		})
	);
}

if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
	providers.push(
		Email({
			server: process.env.EMAIL_SERVER!,
			from: process.env.EMAIL_FROM!,
		})
	);
}

const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers,
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: "database" },
	callbacks: {
		async session({ session, user }) {
			if (session.user) {
				(session.user as any).id = user.id;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
