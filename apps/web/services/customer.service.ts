import { APIService } from "./api.service";
import { ICustomer, ICollectionSummary } from "@plane/types";

export class CustomerService extends APIService {
  constructor() {
    super("/api");
  }

  async getCustomers(workspaceSlug: string): Promise<ICustomer[]> {
    return this.get(`/workspaces/${workspaceSlug}/customers/`).then((res) => res.data);
  }

  async createCustomer(workspaceSlug: string, data: Partial<ICustomer>): Promise<ICustomer> {
    return this.post(`/workspaces/${workspaceSlug}/customers/`, data).then((res) => res.data);
  }

  async updateCustomer(workspaceSlug: string, customerId: string, data: Partial<ICustomer>): Promise<ICustomer> {
    return this.patch(`/workspaces/${workspaceSlug}/customers/${customerId}/`, data).then((res) => res.data);
  }

  async deleteCustomer(workspaceSlug: string, customerId: string): Promise<any> {
    return this.delete(`/workspaces/${workspaceSlug}/customers/${customerId}/`).then((res) => res.data);
  }

  async getCollectionSummary(workspaceSlug: string): Promise<ICollectionSummary[]> {
    return this.get(`/workspaces/${workspaceSlug}/collection-summary/`).then((res) => res.data);
  }
}
