// Add "use client" at the top of the file
"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { usePathname } from "next/navigation";
  
  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathname = usePathname(); // Get the current route
    let subRoute1 = pathname.split('/');
    return (
      <section>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/pages/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              {subRoute1.length > 3 && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbLink href={`/pages/dashboard/${subRoute1[3]}`}>{subRoute1[3]}</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children}
      </section>
    );
  }
  