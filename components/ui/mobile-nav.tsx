"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<div className="md:hidden">
			<button
				aria-label="Open navigation"
				aria-expanded={open}
				aria-controls="mobile-drawer"
				className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card text-foreground/80 shadow-sm transition-colors hover:bg-accent hover:text-foreground"
				onClick={() => setOpen(true)}
		>
			<Menu className="h-5 w-5" />
		</button>
			<AnimatePresence>
				{open && (
					<>
						<motion.div
							key="overlay"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-50 bg-black/50"
							onClick={() => setOpen(false)}
						/>
						<motion.aside
							id="mobile-drawer"
							key="drawer"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85%] overflow-y-auto border-l bg-background p-6 shadow-xl"
							role="dialog"
							aria-modal="true"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-blue-500" aria-hidden />
									<span className="font-semibold tracking-tight">AI Artistry</span>
								</div>
								<button aria-label="Close navigation" className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-accent" onClick={() => setOpen(false)}>
									<X className="h-4 w-4" />
								</button>
							</div>
							<nav className="mt-6 grid gap-3 text-sm">
								<Link href="/generator" className="rounded-md px-2 py-2 hover:bg-accent" onClick={() => setOpen(false)}>Generator</Link>
								<Link href="/dashboard" className="rounded-md px-2 py-2 hover:bg-accent" onClick={() => setOpen(false)}>Dashboard</Link>
								<Link href="#pricing" className="rounded-md px-2 py-2 hover:bg-accent" onClick={() => setOpen(false)}>Pricing</Link>
								<Link href="#contact" className="rounded-md px-2 py-2 hover:bg-accent" onClick={() => setOpen(false)}>Contact</Link>
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}


