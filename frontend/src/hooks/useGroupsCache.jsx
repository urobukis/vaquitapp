import { useStore } from "@/lib/api/authServices";
import { useQuery } from "@tanstack/react-query";


export const useGroupsCache = () => {
  const getMyGroups = useStore((state) => state.getMyGroups);
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      return await getMyGroups();
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
