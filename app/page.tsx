import Dashboard from "@/app/dashboard/page";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Kanban from "@/app/kanban/page";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* logged */}
      <Nav/>
      <Header/>
      <Dashboard/>
      <Kanban/>
      {/* logged */}
    </main>
  );
}
