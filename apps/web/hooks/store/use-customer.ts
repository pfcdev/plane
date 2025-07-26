import { mobxStore } from "lib/mobx/store-provider";
import { RootStore } from "store/root.store";

export const useCustomer = (): RootStore["customerStore"] => {
  const { customerStore } = mobxStore;
  return customerStore;
};
