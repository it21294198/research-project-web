import { IRoverMetrics } from "@/interfaces/metrics.interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapRoverMetricsToNames = (data: IRoverMetrics) => {
  return Object.keys(data).map((module) => {
    return {
      id: module,
      name: module,
    };
  });
};
