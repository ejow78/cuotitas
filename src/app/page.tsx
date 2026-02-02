import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient(); // Await the async createClient
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-tight">Cuotitas</h1>
        <p className="text-muted-foreground text-lg">
          Gestiona tus finanzas, cuotas y deudas en un solo lugar.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {user ? (
            <div className="flex flex-col gap-4">
              <p>Bienvenido, {user.email}</p>
              {/* Dashboard content will go here */}
              <Button asChild>
                <Link href="/dashboard">Ir al Dashboard</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg">
              <Link href="/login">Comenzar</Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
