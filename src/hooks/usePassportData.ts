import { useQuery } from "@tanstack/react-query";
import { fetchPassport } from "@/services/passportApi";
import type { FetchPassportResult } from "@/services/passportApi";

export function usePassportData(passportId: string | undefined, visibility = "internal") {
  return useQuery<FetchPassportResult>({
    queryKey: ["passport", passportId, visibility],
    queryFn: () => fetchPassport(passportId!, visibility),
    enabled: !!passportId,
    staleTime: 5 * 60 * 1000,
  });
}
