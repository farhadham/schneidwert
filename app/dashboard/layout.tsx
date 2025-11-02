"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layouts/dashboard-layout/sidebar";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in"); // Navigate to the sign-in page
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        user={{
          email: session.user.email,
          name: session.user.name,
          avatar: session.user.image,
        }}
      />
      <main className="w-full">
        <div className="flex w-full items-center justify-between border-b px-3 py-2 md:px-4 lg:px-6">
          <SidebarTrigger />
          <DarkModeToggle />
        </div>
        <section className="px-3 py-4 md:px-4 lg:px-6">{children}</section>
      </main>
    </SidebarProvider>
  );
}
