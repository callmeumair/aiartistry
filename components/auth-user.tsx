"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AuthUser() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div className="text-sm text-muted-foreground">Loading...</div>;
	}

	if (!session?.user) {
		return (
			<Button size="sm" onClick={() => signIn()}>Sign in</Button>
		);
	}

	return (
		<div className="flex items-center gap-2">
			{session.user.image && (
				<Image src={session.user.image} alt={session.user.name ?? ""} width={28} height={28} className="rounded-full" />
			)}
			<span className="text-sm">{session.user.name ?? session.user.email}</span>
			<Button size="sm" variant="outline" onClick={() => signOut()}>Sign out</Button>
		</div>
	);
}
