"use client";

import React from "react";
import { observer } from "mobx-react";
import useSWR from "swr";
import { ICollection } from "@plane/types";
import { CollectionService } from "@/services/collection.service";
import { useWorkspace } from "@/hooks/store";
import { Button } from "@plane/ui";

const collectionService = new CollectionService();

export const CollectionList = observer(() => {
  const { currentWorkspace } = useWorkspace();
  const { data: collections } = useSWR(
    currentWorkspace ? `COLLECTIONS_${currentWorkspace.slug}` : null,
    () => (currentWorkspace ? collectionService.getCollections(currentWorkspace.slug) : null)
  );

  if (!collections) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Button variant="primary">Add Collection</Button>
      </div>
      <div className="border rounded-md">
        <table className="min-w-full divide-y divide-custom-border-200">
          <thead className="bg-custom-background-80">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-custom-background-100 divide-y divide-custom-border-200">
            {collections.map((collection: ICollection) => (
              <tr key={collection.id}>
                <td className="px-6 py-4 whitespace-nowrap">{collection.project}</td>
                <td className="px-6 py-4 whitespace-nowrap">{collection.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{collection.collection_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{collection.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
