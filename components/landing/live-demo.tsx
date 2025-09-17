"use client";

import { motion } from "framer-motion";

export function LiveDemo() {
	return (
		<section id="demo" className="mx-auto max-w-7xl px-6 py-20">
			<div className="grid items-center gap-8 md:grid-cols-2">
				<div>
					<h3 className="text-2xl font-semibold tracking-tight md:text-3xl">See it in action</h3>
					<p className="mt-3 text-muted-foreground">Prompt, iterate, and export. Watch how AI Artistry generates visuals in real time.</p>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
					className="relative overflow-hidden rounded-2xl border bg-card/60 p-2 shadow-sm backdrop-blur"
				>
					<div className="aspect-video w-full overflow-hidden rounded-xl bg-black/80">
						<video className="h-full w-full object-cover" autoPlay muted loop playsInline aria-label="Product demo">
							<source src="/demo.mp4" type="video/mp4" />
							{/* Fallback poster handled by browser if no source */}
						</video>
					</div>
				</motion.div>
			</div>
		</section>
	);
}


