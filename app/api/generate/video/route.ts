import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateVideoAndStore } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bodySchema = z.object({ prompt: z.string().min(3).max(2000) });

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const json = await req.json();
		const parse = bodySchema.safeParse(json);
		if (!parse.success) {
			return NextResponse.json({ error: "Invalid body", details: parse.error.flatten() }, { status: 400 });
		}
		const { prompt } = parse.data;
		const { url, path } = await generateVideoAndStore({ prompt, userId: session.user.id });
		await prisma.generation.create({ data: { type: "VIDEO", prompt, fileUrl: url, userId: session.user.id } });
		return NextResponse.json({ url, path });
	} catch (error: unknown) {
		console.error("/api/generate/video", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
