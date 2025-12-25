import { useAppStore } from "@/stores/app-store";
import { Firm } from "@/lib/types";

export const firmService = {
  list: () => useAppStore.getState().firms,
  requestJoin: (id: string) => {
    useAppStore.getState().requestJoinFirm(id);
    return useAppStore.getState().firms.find((f) => f.id === id) as Firm;
  },
  approveJoin: (id: string) => {
    useAppStore.getState().approveFirmJoin(id);
    return useAppStore.getState().firms.find((f) => f.id === id) as Firm;
  },
};
