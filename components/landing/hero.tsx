"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";

function ParticleField({ count = 3000 }: { count?: number }) {
	const points = useMemo(() => {
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const r = 1.5 + Math.random() * 2.5;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);
		}
		return positions;
	}, [count]);

	const ref = useRef<THREE.Points>(null);
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (ref.current) {
			ref.current.rotation.y = t * 0.02;
			ref.current.rotation.x = Math.sin(t * 0.1) * 0.05;
		}
	});

	return (
		<Points ref={ref} positions={points} stride={3} frustumCulled>
			<PointMaterial transparent color="#86b7ff" size={0.01} sizeAttenuation depthWrite={false} opacity={0.8} />
		</Points>
	);
}

function FloatingNodes() {
	return (
		<Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
			<mesh position={[-1.2, 0.4, -1.5]}> 
				<sphereGeometry args={[0.15, 32, 32]} />
				<meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.4} roughness={0.3} metalness={0.2} />
			</mesh>
			<mesh position={[1.1, -0.2, -1.2]}>
				<icosahedronGeometry args={[0.18, 0]} />
				<meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.3} roughness={0.2} metalness={0.3} />
			</mesh>
			<mesh position={[0, 0.8, -1]}>
				<dodecahedronGeometry args={[0.12, 0]} />
				<meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.25} roughness={0.25} metalness={0.25} />
			</mesh>
		</Float>
	);
}

function Background() {
	const reduce = useReducedMotion();
	return (
		<Canvas className="absolute inset-0 -z-10" dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 45 }}>
			<color attach="background" args={["transparent"]} />
			<ambientLight intensity={0.4} />
			<directionalLight position={[3, 3, 3]} intensity={0.6} />
			{!reduce && (
				<>
					<ParticleField />
					<FloatingNodes />
				</>
			)}
		</Canvas>
	);
}

export function Hero() {
	return (
		<section className="relative isolate overflow-hidden">
			<div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(1200px_600px_at_50%_-100px,theme(colors.primary/30),transparent_60%)]" />
			<Background />
			<div className="mx-auto max-w-7xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
				<motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs uppercase tracking-[0.2em] text-primary">AI First Creative Suite</motion.p>
				<motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl [font-variation-settings:'slnt'_0]" style={{ fontFamily: "var(--font-orbitron), var(--font-inter), ui-sans-serif" }}>
					Generate AI-powered videos, images, and designs effortlessly.
				</motion.h1>
				<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }} className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground md:text-lg">
					Create stunning visuals with real-time generation and production-grade workflows.
				</motion.p>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-8 flex items-center justify-center gap-3">
					<Link href="/generator" className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background shadow-sm transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						Get Started
					</Link>
					<a href="#demo" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-accent">
						Watch Demo
					</a>
				</motion.div>
				<div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 items-center gap-6 opacity-80">
					<div className="rounded-xl border bg-card/50 p-4 backdrop-blur">
						<div className="text-xs text-muted-foreground">Projects Created</div>
						<div className="mt-1 text-2xl font-semibold">10k+</div>
					</div>
					<div className="rounded-xl border bg-card/50 p-4 backdrop-blur">
						<div className="text-xs text-muted-foreground">Realtime Generation</div>
						<div className="mt-1 text-2xl font-semibold"><span className="text-primary">~1.2s</span></div>
					</div>
					<div className="rounded-xl border bg-card/50 p-4 backdrop-blur">
						<div className="text-xs text-muted-foreground">Uptime</div>
						<div className="mt-1 text-2xl font-semibold">99.9%</div>
					</div>
				</div>
			</div>
		</section>
	);
}


