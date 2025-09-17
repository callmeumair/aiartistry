import { uploadFile } from "@/lib/storage";

async function generateImageOpenAI(prompt: string): Promise<Uint8Array> {
	// Placeholder: replace with OpenAI Images API call in Step 8 refinement
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' fill='black'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='20'>${prompt}</text></svg>`;
	return new TextEncoder().encode(svg);
}

async function generateImageStability(prompt: string): Promise<Uint8Array> {
	// Placeholder image bytes
	return generateImageOpenAI(prompt);
}

export async function generateImageAndStore(params: {
	prompt: string;
	userId: string;
}): Promise<{ url: string; path: string }> {
	const provider = process.env.AI_IMAGE_PROVIDER?.toLowerCase() || "openai";
	let bytes: Uint8Array;
	if (provider === "stability") {
		bytes = await generateImageStability(params.prompt);
	} else {
		bytes = await generateImageOpenAI(params.prompt);
	}
	const fileName = `${params.userId}/${crypto.randomUUID()}.svg`;
	const arrayBuffer: ArrayBuffer = bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength
		? (bytes.buffer as ArrayBuffer)
		: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
	const { publicUrl, path } = await uploadFile({
		path: fileName,
		file: arrayBuffer,
		contentType: "image/svg+xml",
	});
	return { url: publicUrl, path };
}

export async function generateVideoAndStore(params: {
	prompt: string;
	userId: string;
}): Promise<{ url: string; path: string }> {
	// Placeholder: in Step 8 refinement, call Runway API and upload video bytes
	const placeholder = new TextEncoder().encode("video placeholder");
	const fileName = `${params.userId}/${crypto.randomUUID()}.txt`;
	const arrayBuffer: ArrayBuffer = placeholder.byteOffset === 0 && placeholder.byteLength === placeholder.buffer.byteLength
		? (placeholder.buffer as ArrayBuffer)
		: placeholder.buffer.slice(placeholder.byteOffset, placeholder.byteOffset + placeholder.byteLength) as ArrayBuffer;
	const { publicUrl, path } = await uploadFile({
		path: fileName,
		file: arrayBuffer,
		contentType: "text/plain",
	});
	return { url: publicUrl, path };
}

export async function generateDesignAndStore(params: {
	prompt: string;
	userId: string;
}): Promise<{ url: string; path: string }> {
	// Placeholder: in Step 8 refinement, call provider and upload design artifact
	const placeholder = new TextEncoder().encode(`design: ${params.prompt}`);
	const fileName = `${params.userId}/${crypto.randomUUID()}.txt`;
	const arrayBuffer: ArrayBuffer = placeholder.byteOffset === 0 && placeholder.byteLength === placeholder.buffer.byteLength
		? (placeholder.buffer as ArrayBuffer)
		: placeholder.buffer.slice(placeholder.byteOffset, placeholder.byteOffset + placeholder.byteLength) as ArrayBuffer;
	const { publicUrl, path } = await uploadFile({
		path: fileName,
		file: arrayBuffer,
		contentType: "text/plain",
	});
	return { url: publicUrl, path };
}
