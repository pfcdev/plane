"use client";

import React from "react";
import { observer } from "mobx-react";
import useSWR from "swr";
import { ICollectionSummary } from "@plane/types";
import { CustomerService } from "@/services/customer.service";
import { useWorkspace } from "@/hooks/store";

const customerService = new CustomerService();

export const CollectionSummary = observer(() => {
  const { currentWorkspace } = useWorkspace();
  const { data: summary } = useSWR(
    currentWorkspace ? `COLLECTION_SUMMARY_${currentWorkspace.slug}` : null,
    () => (currentWorkspace ? customerService.getCollectionSummary(currentWorkspace.slug) : null)
  );

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border-b border-custom-border-200">
      <h2 className="text-lg font-semibold">Collection Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {summary.map((item: ICollectionSummary) => (
          <div key={item.customer_id} className="p-4 border rounded-md">
            <h3 className="font-semibold">{item.customer_name}</h3>
            <p>Total Project Price: {item.total_project_price}</p>
            <p>Total Collected: {item.total_collected_amount}</p>
            <p>Remaining: {item.remaining_amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
