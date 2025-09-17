"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield } from "lucide-react";

const items = [
	{ title: "10k+ Projects Created", icon: Zap, desc: "Trusted by creators and teams globally." },
	{ title: "Realtime Generation", icon: Cpu, desc: "Low-latency pipelines optimized for speed." },
	{ title: "Enterprise Ready", icon: Shield, desc: "SSO, audit logs, and SOC2 in progress." },
];

export function Why() {
	return (
		<section className="mx-auto max-w-7xl px-6 py-20">
			<div className="grid gap-6 md:grid-cols-3">
				{items.map((item, i) => {
					const Icon = item.icon;
					return (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ delay: i * 0.1, duration: 0.4 }}
							className="rounded-2xl border bg-card/60 p-6 backdrop-blur"
						>
							<Icon className="h-5 w-5 text-primary" />
							<div className="mt-3 text-lg font-medium">{item.title}</div>
							<p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}


