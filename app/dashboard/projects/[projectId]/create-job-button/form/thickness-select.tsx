import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useApiQuery } from "@/hooks/use-api";
import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { materialQueryKeys } from "@/server/query-keys";
import { Control, Controller } from "react-hook-form";
import { CreateJobFormType } from "./schema";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type Props = {
  materialId: string;
  control: Control<CreateJobFormType>;
};

export default function ThicknessSelect({ materialId, control }: Props) {
  const { data, isPending, error, isFetching } = useApiQuery({
    queryKey: materialQueryKeys.detail(materialId),
    queryFn: () =>
      handleRpcResponse(
        mainApiClient.api.materials[":materialId"].thicknesses.$get({
          param: { materialId: materialId },
        }),
      ),
    enabled: !!materialId,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Controller
      name="materialThicknessId"
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="responsive" data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor="form-rhf-select-thickness">
              Material Thickness
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="form-rhf-select-thickness"
              aria-invalid={fieldState.invalid}
              className="min-w-[120px]"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {data.data.map((thickness) => (
                <SelectItem key={thickness.id} value={thickness.id}>
                  {thickness.thicknessMm} mm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
