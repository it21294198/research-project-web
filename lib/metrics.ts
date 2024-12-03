import api from "@/config/axios.config";
import { QUERY_MUTATION_KEYS } from "@/constants/metrics";
import { useQuery } from "@tanstack/react-query";

const fetchMetrics = async () => {
  const response = await api.post("/rover/status/1");
  return response.data;
};

export const useFetchMetrics = () => {
  return useQuery({
    queryKey: [QUERY_MUTATION_KEYS.METRICS, "all"],
    queryFn: fetchMetrics,
  });
};
