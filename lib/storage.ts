import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "aiartistry";

export async function ensureBucket(): Promise<void> {
	const client = getSupabaseAdmin();
	const { data: list, error: listError } = await client.storage.listBuckets();
	if (listError) throw listError;
	const exists = list?.some((b) => b.name === BUCKET);
	if (!exists) {
		const { error } = await client.storage.createBucket(BUCKET, {
			public: true,
		});
		if (error) throw error;
	}
}

export async function uploadFile(opts: {
	path: string; // e.g. userId/uuid.png
	file: ArrayBuffer | Blob;
	contentType?: string;
	upsert?: boolean;
}): Promise<{ path: string; publicUrl: string }> {
	const client = getSupabaseAdmin();
	await ensureBucket();
	const { data, error } = await client.storage
    .from(BUCKET)
    .upload(opts.path, opts.file as ArrayBuffer | Blob, {
			contentType: opts.contentType,
			upsert: opts.upsert ?? true,
		});
	if (error) throw error;
	const publicUrl = getPublicUrl(data.path);
	return { path: data.path, publicUrl };
}

export function getPublicUrl(path: string): string {
	const { data } = getSupabaseAdmin().storage.from(BUCKET).getPublicUrl(path);
	return data.publicUrl;
}
