import Dropzone, { type Accept } from "react-dropzone";
import UploadIcon from "../../assets/svg/upload-icon.svg?react";
import { cn } from "../../lib/utils";
import MinusIcon from "../../assets/svg/minus-icon.svg?react";
import { FormLabel, FormMessage } from "../ui";
import { useFieldArray, type useForm } from "react-hook-form";
import { useMemo } from "react";

export interface IDropzoneItemProps {
  form: ReturnType<typeof useForm>;
  name: string;
  accept?: Accept;
  maxSize?: number;
}

export default function DropzoneItem({
  form,
  name,
  accept,
  maxSize = 5000000,
}: IDropzoneItemProps) {
  const { fields, append, remove } = useFieldArray({
    name,
    control: form.control,
  });

  const fieldsUpload = useMemo(
    () => fields as { name: string; id: string; content: File }[],
    [fields]
  );

  return (
    <>
      <FormLabel className="flex justify-between items-center">
        {name}
      </FormLabel>
      <Dropzone
        accept={accept}
        onDropAccepted={async (acceptedFiles) => {
          form.clearErrors(name);
          for (const file of acceptedFiles) {
            const name = file.name;
            append({
              name,
              content: file,
            });
          }
        }}
        onDropRejected={(error) => {
          form.setError(name, {
            message: error[0]?.errors?.[0]?.message ?? "Upload file error",
          });
        }}
        multiple={true}
        maxSize={maxSize}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({
              className: cn(
                "border border-dashed border-[#303030] py-[29px] flex items-center justify-center cursor-pointer"
              ),
              "data-testid": "dropzone-id",
            })}>
            <input {...getInputProps()} />
            <p className="font-pro text-[10px] text-[#606060] flex flex-col gap-[4px] items-center">
              <UploadIcon />
              <div>Click to upload (PDF)</div>
            </p>
          </div>
        )}
      </Dropzone>
      <FormMessage />
      <div>
        {fieldsUpload.map((field, index) => (
          <div key={field.id} className="flex mb-[10px] justify-between">
            <div>
              <div
                data-testid="field-name-dropzoneItem"
                className="font-pro text-[11px] text-[#B9B9B9]">
                {field.name}
              </div>
              <div className="font-pro text-[10px] text-[#606060]">
                {field.content?.size && `${field.content?.size} bytes`}
              </div>
            </div>

            <MinusIcon
              role="img"
              className="cursor-pointer"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
