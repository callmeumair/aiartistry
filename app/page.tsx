"use client";

import { motion } from "framer-motion";

export default function Home() {
	return (
		<div className="space-y-6">
			<motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-3xl font-semibold tracking-tight">AI Artistry</motion.h1>
			<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="text-muted-foreground max-w-2xl">
				Generate AI-powered videos, images, and designs. Sign in to start creating
				and manage your projects in your dashboard.
			</motion.p>
		</div>
	);
}
