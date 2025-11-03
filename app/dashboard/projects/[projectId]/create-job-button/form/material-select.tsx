import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useApiQuery } from "@/hooks/use-api";
import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { materialQueryKeys } from "@/server/query-keys";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MaterialSelect({ value, onChange }: Props) {
  const { data, isPending, error } = useApiQuery({
    queryKey: materialQueryKeys.all,
    queryFn: () => handleRpcResponse(mainApiClient.api.materials.$get()),
  });

  console.log(data);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel htmlFor="material-select">Material</FieldLabel>
      </FieldContent>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="material-select" className="w-full">
          <SelectValue placeholder="Select a material" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Materials</SelectLabel>
            {data.data.map((material) => (
              <SelectItem key={material.id} value={material.id}>
                {material.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
