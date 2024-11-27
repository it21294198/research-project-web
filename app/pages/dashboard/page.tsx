"use client"
import Demo from "@/components/site/ProccessDemo/Demo";

// /http://localhost:3000/pages/dashboard
export default function DashboardPage() {
    return (
      <div>
        <h1>DashBoard</h1>
        <a href={`/pages/dashboard/settings`}>To settings</a>
        <Demo />
      </div>
    );
  }
  