import { useQuery } from "@tanstack/react-query";
import { fetchPassport } from "@/services/passportApi";
import type { PassportData } from "@/types/passport";

export function usePassportData(passportId: string | undefined, visibility = "internal") {
  return useQuery<PassportData>({
    queryKey: ["passport", passportId, visibility],
    queryFn: () => fetchPassport(passportId!, visibility),
    enabled: !!passportId,
    staleTime: 5 * 60 * 1000,
  });
}
