"use client";

import { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { useParams, usePathname } from "next/navigation";
// i18n
import { useTranslation } from "@plane/i18n";
import { TProjectAppliedDisplayFilterKeys, TProjectFilters } from "@plane/types";
// components
import { calculateTotalFilters } from "@plane/utils";
import { PageHead } from "@/components/core/page-title";
import { ProjectAppliedFiltersList, ProjectCardList } from "@/components/project";
// helpers
// hooks
import { useProject, useProjectFilter, useWorkspace } from "@/hooks/store";

const Root = observer(() => {
  const { currentWorkspace } = useWorkspace();
  const { workspaceSlug } = useParams();
  const pathname = usePathname();
  const { t } = useTranslation();
  // store
  const { projects, totalProjectIds, filteredProjectIds } = useProject();
  const {
    currentWorkspaceFilters,
    currentWorkspaceAppliedDisplayFilters,
    clearAllFilters,
    clearAllAppliedDisplayFilters,
    updateFilters,
    updateDisplayFilters,
  } = useProjectFilter();
  // derived values
  const pageTitle = currentWorkspace?.name
    ? `${currentWorkspace?.name} - ${t("workspace_projects.label", { count: 2 })}`
    : undefined;

  const totalProjects = projects ? Object.keys(projects).length : 0;
  const totalRevenue = projects
    ? Object.values(projects).reduce((acc: number, curr: any) => acc + (curr.price ?? 0), 0)
    : 0;

  const isArchived = pathname.includes("/archives");

  const allowedDisplayFilters =
    currentWorkspaceAppliedDisplayFilters?.filter((filter) => filter !== "archived_projects") ?? [];

  const handleRemoveFilter = useCallback(
    (key: keyof TProjectFilters, value: string | null) => {
      if (!workspaceSlug) return;
      let newValues = currentWorkspaceFilters?.[key] ?? [];

      if (!value) newValues = [];
      else newValues = newValues.filter((val: any) => val !== value);

      updateFilters(workspaceSlug.toString(), { [key]: newValues });
    },
    [currentWorkspaceFilters, updateFilters, workspaceSlug]
  );

  const handleRemoveDisplayFilter = useCallback(
    (key: TProjectAppliedDisplayFilterKeys) => {
      if (!workspaceSlug) return;
      updateDisplayFilters(workspaceSlug.toString(), { [key]: false });
    },
    [updateDisplayFilters, workspaceSlug]
  );

  const handleClearAllFilters = useCallback(() => {
    if (!workspaceSlug) return;
    clearAllFilters(workspaceSlug.toString());
    clearAllAppliedDisplayFilters(workspaceSlug.toString());
    if (isArchived) updateDisplayFilters(workspaceSlug.toString(), { archived_projects: true });
  }, [clearAllFilters, clearAllAppliedDisplayFilters, workspaceSlug]);

  useEffect(() => {
    isArchived
      ? updateDisplayFilters(workspaceSlug.toString(), { archived_projects: true })
      : updateDisplayFilters(workspaceSlug.toString(), { archived_projects: false });
  }, [pathname]);

  return (
    <>
      <PageHead title={pageTitle} />
      <div className="flex h-full w-full flex-col">
        <div className="mb-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Ödeme Paneli</h2>
              <p className="text-indigo-200">Tüm projelere genel bakış</p>
            </div>
            <div className="text-right">
              <div className="text-lg">Toplam Proje</div>
              <div className="text-3xl font-extrabold">{totalProjects}</div>
            </div>
            <div className="text-right">
              <div className="text-lg">Toplam Tutar</div>
              <div className="text-3xl font-extrabold">{totalRevenue.toLocaleString()} ₺</div>
            </div>
          </div>
        </div>
        {(calculateTotalFilters(currentWorkspaceFilters ?? {}) !== 0 || allowedDisplayFilters.length > 0) && (
          <ProjectAppliedFiltersList
            appliedFilters={currentWorkspaceFilters ?? {}}
            appliedDisplayFilters={allowedDisplayFilters}
            handleClearAllFilters={handleClearAllFilters}
            handleRemoveFilter={handleRemoveFilter}
            handleRemoveDisplayFilter={handleRemoveDisplayFilter}
            filteredProjects={filteredProjectIds?.length ?? 0}
            totalProjects={totalProjectIds?.length ?? 0}
            alwaysAllowEditing
          />
        )}
        <ProjectCardList />
      </div>
    </>
  );
});

export default Root;
