"use client";

import React from "react";
import { observer } from "mobx-react";
// components
import { PageHead } from "@/components/core";
import { CollectionSummary, CollectionList } from "@/components/collection";
// hooks
import { useWorkspace } from "@/hooks/store";

const CollectionsPage = observer(() => {
  // store
  const { currentWorkspace } = useWorkspace();
  // derived values
  const pageTitle = currentWorkspace?.name ? `${currentWorkspace?.name} - Collections` : "Collections";

  return (
    <>
      <PageHead title={pageTitle} />
      <div className="flex flex-col h-full w-full overflow-hidden">
        <CollectionSummary />
        <CollectionList />
      </div>
    </>
  );
});

export default CollectionsPage;
