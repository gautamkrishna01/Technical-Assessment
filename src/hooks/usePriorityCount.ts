import { useMemo } from "react";
import type { ApiItem } from "../types";

export function usePriorityCount(apiData: ApiItem[]) {
  return useMemo(() => {
    const map = new Map<number, string>();
    for (const item of apiData) {
      map.set(item.priorityDe, item.ptcount);
    }
    return map;
  }, [apiData]);
}
