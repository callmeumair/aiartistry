"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const current = theme === "system" ? systemTheme : theme;

	return (
		<button
			aria-label="Toggle theme"
			className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card text-foreground/80 shadow-sm transition-colors hover:bg-accent hover:text-foreground"
			onClick={() => setTheme(current === "dark" ? "light" : "dark")}
			disabled={!mounted}
		>
			<span className="sr-only">Toggle theme</span>
			{current === "dark" ? (
				<Sun className="h-4 w-4" />
			) : (
				<Moon className="h-4 w-4" />
			)}
		</button>
	);
}


