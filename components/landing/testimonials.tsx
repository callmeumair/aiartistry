"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const logos = ["globe.svg", "vercel.svg", "next.svg", "window.svg"] as const;

export function Testimonials() {
	return (
		<section className="mx-auto max-w-7xl px-6 py-20">
			<div className="text-center">
				<h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Trusted by creators and teams</h3>
				<p className="mx-auto mt-3 max-w-2xl text-muted-foreground">From indie studios to global brands.</p>
			</div>
			<div className="mt-8 overflow-hidden rounded-xl border bg-card/60 py-4">
				<Marquee pauseOnHover gradient gradientColor={[0,0,0,0]} speed={40}>
					{logos.concat(logos).map((logo, i) => (
						<motion.div
							key={`${logo}-${i}`}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="mx-10 flex h-12 items-center"
						>
							<img src={`/${logo}`} alt="Client logo" className="h-8 w-auto opacity-70" />
						</motion.div>
					))}
				</Marquee>
			</div>
		</section>
	);
}


