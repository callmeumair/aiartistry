import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Please sign in to view your generations.</p>
      </motion.div>
    );
  }

  const generations = await prisma.generation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your recent AI generations</p>
      </div>

      {generations.length === 0 ? (
        <p className="text-sm text-muted-foreground">No generations yet. Try the Generator page.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generations.map((g) => (
            <Card key={g.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize">{g.type.toLowerCase()}</span>
                  <span className="text-xs text-muted-foreground">{g.createdAt.toLocaleString?.() || new Date(g.createdAt).toLocaleString()}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">{g.prompt}</p>
                {g.type === "IMAGE" ? (
                  <Image src={g.fileUrl} alt="Generated" width={480} height={360} className="rounded-md border h-auto w-full" />
                ) : (
                  <a href={g.fileUrl} target="_blank" rel="noreferrer" className="text-primary underline text-sm">
                    Open {g.type.toLowerCase()} file
                  </a>
                )}
                <div>
                  <a
                    href={g.fileUrl}
                    download
                    className="text-xs text-muted-foreground underline"
                  >
                    Download
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}


