import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CommonHeader from "../CommonHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import { Button, Input } from "../ui";
import clsx from "clsx";
import BackArrow from "../../assets/svg/back-arrow.svg?react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DropzoneItem from "../DropzoneItem";
import { sleep } from "@aevatar-react-sdk/utils";
import Loading from "../../assets/svg/loading.svg?react";

import { aevatarAI } from "../../utils";
import type { IConfigurationParams } from "../types";

export interface IEditGAevatarProps {
  className?: string;
  type?: "edit" | "create";
  agentName?: string;
  agentId?: string;
  agentTypeList: string[];
  defaultAgentType?: string;
  configuarationParams?: IConfigurationParams[] | null;
  onGagentChange?: (value: string) => void;
  onBack?: () => void;
  onSuccess?: () => void;
}

enum FormItemType {
  String = "System.String",
  Int32 = "System.Int32",
  Int64 = "System.Int64",
  Select = "System.Enum",
  IFormFile = "System.IFormFile",
}

export default function EditGAevatarInner({
  className,
  defaultAgentType,
  agentName,
  agentId,
  agentTypeList,
  configuarationParams,
  type = "create",
  onBack,
  onGagentChange,
  onSuccess,
}: IEditGAevatarProps) {
  const [btnLoading, setBtnLoading] = useState<
    "saving" | "deleting" | undefined
  >();
  const onDelete = useCallback(async () => {
    setBtnLoading("deleting");
    await sleep(2000);
    setBtnLoading(undefined);
    onBack?.();
  }, [onBack]);

  const rightEle = useMemo(() => {
    let text = "create";
    if (type === "create") {
      text = btnLoading === "saving" ? "creating" : "create";
    } else {
      text = btnLoading === "saving" ? "saving" : "save";
    }
    return (
      <div
        data-testid="edit-gaevatar-inner"
        className="flex items-center gap-[8px]">
        <Button
          key={"save"}
          className="p-[8px] px-[18px] gap-[10px] text-[#fff] hover:text-[#303030]"
          type="submit">
          <Loading
            className={clsx(
              "aevatarai-loading-icon",
              btnLoading !== "saving" && "hidden"
            )}
            style={{ width: 14, height: 14 }}
          />
          <span className="text-center font-syne text-[12px] font-semibold lowercase leading-[14px]">
            {text}
          </span>
        </Button>
        <Button
          key={"delete"}
          className={clsx(
            "p-[8px] px-[18px] gap-[10px] text-[#fff] hover:text-[#303030]",
            type === "create" && "hidden"
          )}
          onClick={onDelete}>
          <Loading
            key={"delete"}
            className={clsx(
              "aevatarai-loading-icon",
              btnLoading !== "deleting" && "hidden"
            )}
            style={{ width: 14, height: 14 }}
          />
          <span className="text-center font-syne text-[12px] font-semibold lowercase leading-[14px]">
            delete
          </span>
        </Button>
      </div>
    );
  }, [type, btnLoading, onDelete]);

  const leftEle = useMemo(() => {
    return (
      <div className="flex items-center gap-[16px]">
        {onBack && <BackArrow role="img" onClick={onBack} />}
        <span className="hidden sm:inline-block">g-aevatars configuration</span>
        <span className="inline-block sm:hidden">configuration</span>
      </div>
    );
  }, [onBack]);

  const form = useForm<any>();
  useEffect(() => {
    const agentType = form.getValues("agentType");
    if (!agentType) {
      form.setValue("agentType", defaultAgentType || agentTypeList[0]);
    }
    if (!agentName) {
      form.setValue("agentName", agentName);
    }
  }, [defaultAgentType, agentTypeList, agentName, form]);

  const btnLoadingRef = useRef(btnLoading);
  useEffect(() => {
    btnLoadingRef.current = btnLoading;
  }, [btnLoading]);

  const fieldNames = useMemo(
    () => configuarationParams?.map((item) => item.name),
    [configuarationParams]
  );

  const onSubmit = useCallback(
    async (values: any) => {
      console.log(values, "values=onSubmit");
      try {
        if (btnLoadingRef.current) return;
        const errorFields = [];
        const paramsList = [];
        fieldNames?.forEach((item) => {
          if (!values[item]) errorFields.push(item);
          else paramsList.push({ [item]: values[item] });
        });

        if (!values?.agentName) {
          errorFields.push("agentName");
        }

        if (fieldNames && fieldNames.length > 0 && errorFields.length > 0) {
          errorFields.forEach((item) => {
            form.setError(item, { message: "required" });
          });
          return;
        }
        setBtnLoading("saving");

        console.log(Object.values(paramsList), paramsList, "paramsList===");

        const properties = paramsList.reduce((acc: any, curr) => {
          // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
          return { ...acc, ...curr };
        }, {});

        const params = {
          agentType: values.agentType,
          name: values.agentName,
          properties,
        };
        if (type === "create") {
          await aevatarAI.services.agent.createAgent(params);
        } else {
          await aevatarAI.services.agent.updateAgentInfo(agentId, params);
        }

        setBtnLoading(undefined);
        onSuccess?.();
      } catch (error: any) {
        console.log(error, "error==");
        setBtnLoading(undefined);
      }
    },
    [form, fieldNames, agentId, type, onSuccess]
  );

  const onAgentTypeChange = useCallback(
    (value: string, field: ControllerRenderProps<any, "agentType">) => {
      onGagentChange?.(value);
      field.onChange(value);
    },
    [onGagentChange]
  );

  return (
    <div
      className={clsx(
        "relative bg-black aevatarai-edit-gaevatar-wrapper",
        className
      )}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CommonHeader leftEle={leftEle} rightEle={rightEle} />
          <div
            className={clsx(
              "max-w-[352px] sdk:m-auto bg-[#141415] pt-[22px] pb-[14px]",
              "md:max-w-[361px] md:pt-[0]"
            )}>
            <div className="flex flex-col justify-center gap-[2px] p-[8px] px-[10px] bg-white self-stretch">
              <div className="text-black font-syne text-sm font-semibold leading-normal lowercase">
                settings
              </div>
              <div className="text-[#606060] font-mono text-[11px] font-normal leading-normal lowercase">
                Manage your aevatar settings and preferences
              </div>
            </div>
            <div className="flex flex-col gap-y-[22px] p-[16px_16px_6px_16px] items-start content-start self-stretch">
              <FormField
                control={form.control}
                name="agentType"
                disabled={agentTypeList.length === 0 || type === "edit"}
                render={({ field }) => (
                  <FormItem aria-labelledby="agentTypeLabel">
                    <FormLabel id="agentTypeLabel">
                      *Atomic-aevatars Type
                    </FormLabel>
                    <Select
                      value={field?.value}
                      disabled={field?.disabled}
                      onValueChange={(values) => {
                        onAgentTypeChange(values, field);
                      }}>
                      <FormControl>
                        <SelectTrigger aria-disabled={field?.disabled}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agentTypeList.map((agentType) => (
                          <SelectItem key={agentType} value={agentType}>
                            {agentType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key={"agentName"}
                control={form.control}
                defaultValue={agentName}
                name={"agentName"}
                render={({ field }) => (
                  <FormItem aria-labelledby="agentNameLabel">
                    <FormLabel id="agentNameLabel">
                      *Atomic-Aevatar Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Atomic-Aevatar Name"
                        {...field}
                        value={field?.value}
                        onChange={field?.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {configuarationParams?.map((item, index) => {
                switch (item.type) {
                  case FormItemType.String:
                  case FormItemType.Int32:
                  case FormItemType.Int64:
                    return (
                      <FormField
                        key={`${item.name}-${index}`}
                        control={form.control}
                        defaultValue={item.value}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{item.name}</FormLabel>
                            <FormControl>
                              <Input
                                // placeholder="Atomic-Aevatar Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  case FormItemType.Select:
                    return (
                      <FormField
                        key={`${item.name}-${index}`}
                        control={form.control}
                        defaultValue={item.value}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{item.name}</FormLabel>

                            <Select
                              value={field?.value}
                              disabled={field?.disabled}
                              onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger aria-disabled={field?.disabled}>
                                  <SelectValue placeholder="Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={"AIBasic"}>
                                  AI-Basic
                                </SelectItem>
                                <SelectItem value={"Telegram"}>
                                  Telegram Messaging
                                </SelectItem>
                                <SelectItem value={"Twitter"}>
                                  Twitter Messaging
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  case FormItemType.IFormFile:
                    return (
                      <FormField
                        key={`${item.name}-${index}`}
                        control={form.control}
                        defaultValue={item.value}
                        name={item.name}
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <DropzoneItem
                                form={form}
                                name={"knowledgeBase"}
                                accept={{ "application/pdf": [] }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );
                }
              })}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
