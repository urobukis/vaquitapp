import { useStore } from "@/lib/api/authServices";
import { useQuery } from "@tanstack/react-query";

export const useBalancesCache = (groupId) => {
  const getBalances = useStore((state) => state.getBalances);
  return useQuery({
    queryKey: ["balances", groupId],
    queryFn: async () => {
      return await getBalances(groupId);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};