import { APIService } from "./api.service";
import { ICollection } from "@plane/types";

export class CollectionService extends APIService {
  constructor() {
    super("/api");
  }

  async getCollections(workspaceSlug: string): Promise<ICollection[]> {
    return this.get(`/workspaces/${workspaceSlug}/collections/`).then((res) => res.data);
  }

  async createCollection(workspaceSlug: string, data: Partial<ICollection>): Promise<ICollection> {
    return this.post(`/workspaces/${workspaceSlug}/collections/`, data).then((res) => res.data);
  }

  async updateCollection(workspaceSlug: string, collectionId: string, data: Partial<ICollection>): Promise<ICollection> {
    return this.patch(`/workspaces/${workspaceSlug}/collections/${collectionId}/`, data).then((res) => res.data);
  }

  async deleteCollection(workspaceSlug: string, collectionId: string): Promise<any> {
    return this.delete(`/workspaces/${workspaceSlug}/collections/${collectionId}/`).then((res) => res.data);
  }
}
