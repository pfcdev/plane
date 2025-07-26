"use client";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NETWORK_CHOICES, ETabIndices } from "@plane/constants";
import { useTranslation } from "@plane/i18n";
import { IProject } from "@plane/types";
// ui
import { CustomSelect, Input } from "@plane/ui";
// components
import { getTabIndex } from "@plane/utils";
import { MemberDropdown } from "@/components/dropdowns";
import { ProjectNetworkIcon } from "@/components/project";
// helpers

type Props = {
  isMobile?: boolean;
};

const ProjectAttributes: FC<Props> = (props) => {
  const { isMobile = false } = props;
  const { t } = useTranslation();
  const { control } = useFormContext<IProject>();
  const { getIndex } = getTabIndex(ETabIndices.PROJECT_CREATE, isMobile);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Controller
        name="network"
        control={control}
        render={({ field: { onChange, value } }) => {
          const currentNetwork = NETWORK_CHOICES.find((n: any) => n.key === value);

          return (
            <div className="flex-shrink-0 h-7" tabIndex={getIndex("network")}>
              <CustomSelect
                value={value}
                onChange={onChange}
                label={
                  <div className="flex items-center gap-1 h-full">
                    {currentNetwork ? (
                      <>
                        <ProjectNetworkIcon iconKey={currentNetwork.iconKey} />
                        {t(currentNetwork.i18n_label)}
                      </>
                    ) : (
                      <span className="text-custom-text-400">{t("select_network")}</span>
                    )}
                  </div>
                }
                placement="bottom-start"
                className="h-full"
                buttonClassName="h-full"
                noChevron
                tabIndex={getIndex("network")}
              >
                {NETWORK_CHOICES.map((network: any) => (
                  <CustomSelect.Option key={network.key} value={network.key}>
                    <div className="flex items-start gap-2">
                      <ProjectNetworkIcon iconKey={network.iconKey} className="h-3.5 w-3.5" />
                      <div className="-mt-1">
                        <p>{t(network.i18n_label)}</p>
                        <p className="text-xs text-custom-text-400">{t(network.description)}</p>
                      </div>
                    </div>
                  </CustomSelect.Option>
                ))}
              </CustomSelect>
            </div>
          );
        }}
      />
      <Controller
        name="project_lead"
        control={control}
        render={({ field: { value, onChange } }) => {
          if (value === undefined || value === null || typeof value === "string")
            return (
              <div className="flex-shrink-0 h-7" tabIndex={getIndex("lead")}>
                <MemberDropdown
                  value={value ?? null}
                  onChange={(lead) => onChange(lead === value ? null : lead)}
                  placeholder={t("lead")}
                  multiple={false}
                  buttonVariant="border-with-text"
                  tabIndex={5}
                />
              </div>
            );
          else return <></>;
        }}
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <div className="flex-shrink-0 h-7">
            <Input {...field} type="number" placeholder={t("price")} className="h-full" />
          </div>
        )}
      />
      <Controller
        name="start_date"
        control={control}
        render={({ field }) => (
          <div className="flex-shrink-0 h-7">
            <Input {...field} value={field.value ?? ""} type="date" placeholder={t("start_date")} className="h-full" />
          </div>
        )}
      />
      <Controller
        name="target_date"
        control={control}
        render={({ field }) => (
          <div className="flex-shrink-0 h-7">
            <Input {...field} value={field.value ?? ""} type="date" placeholder={t("target_date")} className="h-full" />
          </div>
        )}
      />
    </div>
  );
};

export default ProjectAttributes;
