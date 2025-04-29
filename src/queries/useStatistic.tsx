import { statisticApi } from "@/apis/statistic";
import { useQuery } from "@tanstack/react-query";

export const useStatisticSystem = (token: string) => {
  return useQuery({
    queryKey: ["statistic-system"],
    queryFn: () => statisticApi.getSystemStatistic(token),
    enabled: !!token,
  });
}