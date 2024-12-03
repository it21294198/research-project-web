import React from "react";
import { Card, CardHeader } from "../ui/card";
import dayjs from "dayjs";
import { LoaderCircle } from "lucide-react";
import { IRoverMetrics } from "@/interfaces/metrics.interface";

type Props = {
  data: IRoverMetrics;
  isLoading: boolean;
};

const PerformanceNotifications = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center h-full w-full">
        <LoaderCircle className="animate-spin" color="#fff" />
      </div>
    );
  }

  const mappedDataArray = Object.keys(data).map((key) => {
    switch (key) {
      case "one":
        return { key: "Rover - Server", value: data[key] };
      case "two":
        return { key: "Server - IMP", value: data[key] };
      case "three":
        return { key: "IMP - Server", value: data[key] };
      case "four":
        return { key: "Server - DB", value: data[key] };
      case "five":
        return { key: "DB - Server", value: data[key] };
      case "six":
        return { key: "Server - Rover", value: data[key] };
      case "time":
        return { key: "Snapshot Time", value: data[key] };
      case "error":
        return { key: "Error", value: data[key] };
      default:
        return { key: "", value: "" };
    }
  });

  return (
    <Card className="flex flex-1 flex-col h-[70vh] shadow-md bg-zinc-300">
      <CardHeader className="h-12 rounded-t-lg   text-center justify-center text-gray-900 text-xl">
        Performance notifications
      </CardHeader>
      <div className="w-full border border-blue-950" />
      <div className="flex flex-col gap-4 px-6">
        <div className="flex justify-between">
          <p>Rover health check</p>
          <p>Time: {dayjs().format("HH:mm:ss a")}</p>
        </div>
        <div className="flex justify-between">
          <p>Server health check</p>
          <p>Time: {dayjs().format("HH:mm:ss a")}</p>{" "}
        </div>
        <div className="">
          {mappedDataArray.map((key) => {
            return (
              <div key={key.key} className="flex justify-between">
                <p>{key.key}</p>

                {key.key == "Snapshot Time" || key.key == "Error" ? (
                  key.key === "Snapshot Time" ? (
                    <p>{dayjs(key.value.toString()).format("HH:mm:ss a")}</p>
                  ) : (
                    key.key === "Error" && (
                      <p>
                        {key.value.toString() === "true"
                          ? "Unknown error occurred"
                          : "No errors"}
                      </p>
                    )
                  )
                ) : (
                  <p>
                    {key.value.toString() === "true" ? "Active" : "Inactive"}
                  </p>
                )}
              </div>
            );
          }, [])}
        </div>
      </div>
    </Card>
  );
};

export default PerformanceNotifications;
