import { Hero } from "@/components/landing/hero";
import { Showcase } from "@/components/landing/showcase";
import { Why } from "@/components/landing/why";
import { LiveDemo } from "@/components/landing/live-demo";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";

export default function Home() {
	return (
		<>
			<Hero />
			<Showcase />
			<Why />
			<LiveDemo />
			<Testimonials />
			<Pricing />
		</>
	);
}
