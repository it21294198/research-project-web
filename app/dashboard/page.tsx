"use client";
import React from "react";
import { useFetchMetrics } from "@/lib/metrics";
import FlowDiagram from "@/components/metrics/flow";
import PerformanceNotifications from "@/components/metrics/notifications";

import { LoaderCircle } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading, isError } = useFetchMetrics();

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center h-full w-full">
        <LoaderCircle className="animate-spin" color="#fff" />
      </div>
    );
  }

  return (
    <main className="flex-1">
      <h1 className="justify-center text-gray-100 text-center text-3xl ">
        Dashboard
      </h1>
      {/* <a href={`/dashboard/settings`}>To settings</a> */}
      {/* <Demo /> */}
      <h2 className="text-white">Performance metrics</h2>
      {isError && <div>Error fetching data</div>}
      <div className="flex flex-1 w-full h-full justify-center items-center gap-x-8 ">
        <FlowDiagram data={data} />
        <PerformanceNotifications data={data} isLoading={isLoading} />
      </div>
    </main>
  );
};

export default Dashboard;
