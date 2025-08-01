import { useStore } from "@/lib/api/authServices";
import { useQuery } from "@tanstack/react-query";

export const useGroupCache = (groupId) => {
  const getGroup = useStore((state) => state.getGroup);
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => {
      return await getGroup(groupId);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};