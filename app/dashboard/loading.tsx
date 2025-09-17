import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-6">
			<div>
				<div className="h-6 w-40"><Skeleton className="h-6 w-40" /></div>
				<div className="h-4 w-64 mt-2"><Skeleton className="h-4 w-64" /></div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="space-y-3">
						<Skeleton className="h-5 w-24" />
						<Skeleton className="h-40 w-full" />
						<Skeleton className="h-4 w-20" />
					</div>
				))}
			</div>
		</div>
	);
}
