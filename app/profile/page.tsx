import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      {!session?.user ? (
        <p className="text-muted-foreground">Please sign in to view your profile.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div><span className="text-muted-foreground">Name:</span> {session.user.name}</div>
          <div><span className="text-muted-foreground">Email:</span> {session.user.email}</div>
          {session.user.image && (
            <Image src={session.user.image} alt="Avatar" width={64} height={64} className="h-16 w-16 rounded-full border" />
          )}
        </div>
      )}
    </div>
  );
}


