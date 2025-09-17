"use client";

import { motion } from "framer-motion";
import { Video, Image, PenTool } from "lucide-react";

const items = [
	{
		title: "Generate Videos",
		icon: Video,
		desc: "Create cinematic clips with prompts and reference styles.",
		gradient: "from-fuchsia-500/20 to-blue-500/20",
	},
	{
		title: "Create Stunning Images",
		icon: Image,
		desc: "High-res images with control over style, lighting, and lens.",
		gradient: "from-amber-500/20 to-rose-500/20",
	},
	{
		title: "Design with AI",
		icon: PenTool,
		desc: "Generate layouts and assets for your next project.",
		gradient: "from-emerald-500/20 to-cyan-500/20",
	},
];

export function Showcase() {
	return (
		<section className="mx-auto max-w-7xl px-6 py-20">
			<div className="text-center">
				<h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Create across mediums</h2>
				<p className="mx-auto mt-3 max-w-2xl text-muted-foreground">One platform for video, images, and design. Built to scale from idea to production.</p>
			</div>
			<div className="mt-10 grid gap-6 md:grid-cols-3">
				{items.map((item, i) => {
					const Icon = item.icon;
					return (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ delay: i * 0.1, duration: 0.4 }}
							className="group relative overflow-hidden rounded-2xl border bg-card/60 p-6 backdrop-blur transition-transform hover:scale-[1.01]"
						>
							<div className={`pointer-events-none absolute -inset-1 -z-10 bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
							<Icon className="h-5 w-5 text-primary" />
							<div className="mt-4 text-lg font-medium">{item.title}</div>
							<p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}


