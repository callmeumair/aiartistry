"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
	{
		name: "Creator",
		price: "$19",
		desc: "For individuals exploring AI visuals.",
		features: ["200 image generations", "20 short videos", "Standard support"],
		accent: "from-primary/20 to-blue-500/20",
	},
	{
		name: "Studio",
		price: "$49",
		desc: "For teams shipping content weekly.",
		features: ["2k image generations", "200 short videos", "Priority support"],
		accent: "from-emerald-500/20 to-cyan-500/20",
		highlight: true,
	},
	{
		name: "Enterprise",
		price: "Custom",
		desc: "Security, SSO, and custom limits.",
		features: ["SSO & audit logs", "Volume discounts", "SLAs"],
		accent: "from-amber-500/20 to-rose-500/20",
	},
];

export function Pricing() {
	return (
		<section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
			<div className="text-center">
				<h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Simple, transparent pricing</h3>
				<p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Scale from idea to production with plans that grow with you.</p>
			</div>
			<div className="mt-10 grid gap-6 md:grid-cols-3">
				{tiers.map((tier, i) => (
					<motion.div
						key={tier.name}
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ delay: i * 0.1, duration: 0.4 }}
						className={`relative rounded-2xl border bg-card/60 p-6 backdrop-blur ${tier.highlight ? "ring-1 ring-primary" : ""}`}
					>
						<div className={`pointer-events-none absolute -inset-1 -z-10 bg-gradient-to-br ${tier.accent} opacity-0 blur-2xl transition-opacity duration-300 hover:opacity-100`} />
						<div className="text-sm font-medium text-primary">{tier.name}</div>
						<div className="mt-2 text-3xl font-semibold">{tier.price}</div>
						<p className="mt-1 text-sm text-muted-foreground">{tier.desc}</p>
						<ul className="mt-4 space-y-2 text-sm">
							{tier.features.map((f) => (
								<li key={f} className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
								</li>
							))}
						</ul>
						<Link href="/generator" className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition-transform hover:scale-[1.01]">Choose {tier.name}</Link>
					</motion.div>
				))}
			</div>
		</section>
	);
}


