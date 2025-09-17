"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html>
			<body className="p-6">
				<h2 className="text-xl font-semibold">Something went wrong!</h2>
				<p className="text-sm text-muted-foreground mt-2">Please try again or refresh the page.</p>
				<button onClick={() => reset()} className="mt-4 underline text-sm">Try again</button>
			</body>
		</html>
	);
}
