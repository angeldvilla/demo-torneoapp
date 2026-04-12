import { db } from "@/lib/db";
import Hero from "@/components/public/hero";
import Features from "@/components/public/features";
import TorneoList from "@/components/public/torneoList";

async function getTorneos() {
  const [rows]: any = await db.query("SELECT * FROM torneos");
  return rows;
}

export default async function Home() {
  const torneos = await getTorneos();

  return (
    <div className="space-y-10">
      <Hero />

      <Features />

      <TorneoList torneos={torneos} />
    </div>
  );
}
