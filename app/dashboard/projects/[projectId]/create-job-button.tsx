"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useApiMutation } from "@/hooks/use-api";
import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { InferRequestType } from "hono";
import { useState } from "react";
import { projectQueryKeys } from "@/server/query-keys";

type Props = {
  projectId: string;
};

const mutationService = mainApiClient.api.projects[":projectId"].jobs.$post;

export default function CreateJobButton({ projectId }: Props) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useApiMutation({
    mutationFn: (data: InferRequestType<typeof mutationService>["json"]) =>
      handleRpcResponse(mutationService({ json: data, param: { projectId } })),
    onCustomSuccess: () => {
      setOpen(false);
    },
    invalidateQueryKeys: projectQueryKeys.detail(projectId),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild>
        <DialogTrigger>Create Job</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new job</DialogTitle>
          <DialogDescription className="sr-only">
            Fill information about the new job.
          </DialogDescription>
        </DialogHeader>

        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Job title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Create Job
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  title: z.string().min(3).max(100),
});
