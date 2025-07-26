import { makeObservable, action, observable } from "mobx";
import { CustomerService } from "@/services/customer.service";
import { ICustomer } from "@plane/types";
import { RootStore } from "./root.store";

export interface ICustomerStore {
  customers: { [key: string]: ICustomer };
  fetchCustomers(workspaceSlug: string): Promise<ICustomer[]>;
}

export class CustomerStore implements ICustomerStore {
  customers: { [key: string]: ICustomer } = {};
  rootStore;
  customerService;

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      customers: observable,
      setCustomers: action,
    });
    this.rootStore = _rootStore;
    this.customerService = new CustomerService();
  }

  setCustomers = (customers: ICustomer[]) => {
    this.customers = customers.reduce((acc, customer) => {
      acc[customer.id] = customer;
      return acc;
    }, {} as { [key: string]: ICustomer });
  };

  fetchCustomers = async (workspaceSlug: string) => {
    try {
      const customers = await this.customerService.getCustomers(workspaceSlug);
      this.setCustomers(customers);
      return customers;
    } catch (error) {
      console.error("Failed to fetch customers", error);
      return [];
    }
  };
}
