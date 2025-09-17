import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-6">
			<div className="h-6 w-40"><Skeleton className="h-6 w-40" /></div>
			<div className="space-y-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-10 w-28" />
			</div>
		</div>
	);
}
