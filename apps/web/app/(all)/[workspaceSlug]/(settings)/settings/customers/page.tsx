"use client";

import React from "react";
import { observer } from "mobx-react";
import useSWR from "swr";
import { ICustomer } from "@plane/types";
import { CustomerService } from "@/services/customer.service";
import { useWorkspace } from "@/hooks/store";
import { Button } from "@plane/ui";

const customerService = new CustomerService();

const CustomersSettingsPage = observer(() => {
  const { currentWorkspace } = useWorkspace();
  const { data: customers, mutate } = useSWR(
    currentWorkspace ? `CUSTOMERS_${currentWorkspace.slug}` : null,
    () => (currentWorkspace ? customerService.getCustomers(currentWorkspace.slug) : null)
  );

  if (!customers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Customers</h2>
        <Button variant="primary">Add Customer</Button>
      </div>
      <div className="border rounded-md">
        <table className="min-w-full divide-y divide-custom-border-200">
          <thead className="bg-custom-background-80">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-custom-text-100 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="bg-custom-background-100 divide-y divide-custom-border-200">
            {customers.map((customer: ICustomer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default CustomersSettingsPage;
