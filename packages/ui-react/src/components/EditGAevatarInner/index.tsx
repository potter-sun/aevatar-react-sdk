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
import { useToast } from "../../hooks/use-toast";
import { handleErrorMessage } from "../../utils/error";

export type TEditGaevatarSuccessType = "create" | "edit" | "delete";

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
  onSuccess?: (type: TEditGaevatarSuccessType) => void;
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

  const { toast } = useToast();

  const onDelete = useCallback(async () => {
    setBtnLoading("deleting");
    try {
      const result = await aevatarAI.services.agent.deleteAgent(agentId);
      console.log(result, "result===");
      // TODO There will be some delay in cqrs
      await sleep(2000);
      onSuccess?.("delete");
    } catch (error) {
      console.error("deleteAgent:", error);
      toast({
        title: "error",
        description: handleErrorMessage(error, "Something went wrong."),
        duration: 3000,
      });
    }
    setBtnLoading(undefined);
  }, [onSuccess, toast, agentId]);

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
        className="sdk:flex sdk:items-center sdk:gap-[8px]">
        <Button
          key={"save"}
          className="sdk:p-[8px] sdk:px-[18px] sdk:gap-[10px] sdk:text-[#fff] sdk:hover:text-[#303030]"
          type="submit">
          <Loading
            className={clsx(
              "aevatarai-loading-icon",
              btnLoading !== "saving" && "sdk:hidden"
            )}
            style={{ width: 14, height: 14 }}
          />
          <span className="sdk:text-center sdk:font-syne sdk:text-[12px] sdk:font-semibold sdk:lowercase sdk:leading-[14px]">
            {text}
          </span>
        </Button>
        <Button
          key={"delete"}
          className={clsx(
            "sdk:p-[8px] sdk:px-[18px] sdk:gap-[10px] sdk:text-[#fff] sdk:hover:text-[#303030]",
            type === "create" && "sdk:hidden"
          )}
          onClick={onDelete}>
          <Loading
            key={"delete"}
            className={clsx(
              "aevatarai-loading-icon",
              btnLoading !== "deleting" && "sdk:hidden"
            )}
            style={{ width: 14, height: 14 }}
          />
          <span className="sdk:text-center sdk:font-syne sdk:text-[12px] sdk:font-semibold sdk:lowercase sdk:leading-[14px]">
            delete
          </span>
        </Button>
      </div>
    );
  }, [type, btnLoading, onDelete]);

  const leftEle = useMemo(() => {
    return (
      <div className="sdk:flex sdk:items-center sdk:gap-[16px]">
        {onBack && (
          <BackArrow role="img" className="cursor-pointer" onClick={onBack} />
        )}
        <span className="sdk:hidden sdk:sm:inline-block">
          g-aevatars configuration
        </span>
        <span className="sdk:inline-block sdk:sm:hidden">configuration</span>
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

  const onSubmit = useCallback(
    async (values: any) => {
      console.log(values, "values=onSubmit");
      try {
        if (btnLoadingRef.current) return;
        const errorFields: { name: string; error: string }[] = [];
        const paramsList = [];
        configuarationParams?.forEach((item) => {
          const isNumberType =
            item.type === FormItemType.Int32 ||
            item.type === FormItemType.Int64;
          const isTypeError = isNumberType
            ? Number.isNaN(Number(values[item.name]))
            : false;

          if (!values[item.name]) {
            errorFields.push({
              name: item.name,
              error: "required",
            });
          } else if (isTypeError) {
            errorFields.push({
              name: item.name,
              error: "Please enter a number",
            });
          } else {
            paramsList.push({ [item.name]: values[item.name] });
          }
        });

        if (!values?.agentName) {
          errorFields.push({ name: "agentName", error: "required" });
        }

        if (
          configuarationParams &&
          configuarationParams.length > 0 &&
          errorFields.length > 0
        ) {
          errorFields.forEach((item) => {
            form.setError(item.name, { message: item.error });
          });
          return;
        }
        setBtnLoading("saving");

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

        // TODO There will be some delay in cqrs
        await sleep(2000);

        setBtnLoading(undefined);
        onSuccess?.(type);
      } catch (error: any) {
        toast({
          title: "error",
          description: handleErrorMessage(error, "Something went wrong."),
          duration: 3000,
        });
        setBtnLoading(undefined);
      }
    },
    [form, configuarationParams, agentId, type, toast, onSuccess]
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
        "sdk:relative sdk:bg-black aevatarai-edit-gaevatar-wrapper",
        className
      )}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CommonHeader leftEle={leftEle} rightEle={rightEle} />
          <div
            className={clsx(
              "sdk:max-w-[352px] sdk:m-auto sdk:bg-[#141415] sdk:pt-[22px] sdk:pb-[14px]",
              "sdk:md:max-w-[361px] sdk:md:pt-[0]"
            )}>
            <div className="sdk:flex sdk:flex-col sdk:justify-center sdk:gap-[2px] sdk:p-[8px] sdk:px-[10px] sdk:bg-white sdk:self-stretch">
              <div className="sdk:text-black sdk:font-syne sdk:text-sm sdk:font-semibold sdk:leading-normal sdk:lowercase">
                settings
              </div>
              <div className="sdk:text-[#606060] sdk:font-mono sdk:text-[11px] sdk:font-normal sdk:leading-normal sdk:lowercase">
                Manage your aevatar settings and preferences
              </div>
            </div>
            <div className="sdk:flex sdk:flex-col sdk:gap-y-[22px] sdk:p-[16px_16px_6px_16px] sdk:items-start sdk:content-start sdk:self-stretch">
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
