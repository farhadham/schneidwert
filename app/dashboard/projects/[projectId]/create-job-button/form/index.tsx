"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { createJobFormSchema, CreateJobFormType } from "./schema";
import { useApiMutation } from "@/hooks/use-api";
import { handleRpcResponse, mainApiClient } from "@/lib/api";
import { InferRequestType } from "hono";
import { projectQueryKeys } from "@/server/query-keys";
import { useState } from "react";

type Props = { projectId: string; onClose: () => void };

const mutationService = mainApiClient.api.projects[":projectId"].jobs.$post;

export default function CreateJobForm({ projectId, onClose }: Props) {
  const { mutate, isPending } = useApiMutation({
    mutationFn: (data: InferRequestType<typeof mutationService>["json"]) =>
      handleRpcResponse(mutationService({ json: data, param: { projectId } })),
    onCustomSuccess: () => {
      onClose();
    },
    invalidateQueryKeys: projectQueryKeys.detail(projectId),
  });

  const [materialId, setMaterialId] = useState<string>("");

  const form = useForm<CreateJobFormType>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      materialThicknessId: "",
      cutLengthMm: 0,
      holesCount: 0,
      setupMin: 0,
      postMin: 0,
      engraveLengthMm: 0,
      qty: 1,
      customerName: "",
      notes: "",
      title: "",
    },
  });

  function onSubmit(data: CreateJobFormType) {
    mutate(data);
  }

  return (
    <form
      id="form-job-creation"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4 sm:grid-cols-2"
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-title">
                Job title
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="materialThicknessId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-material-thickness-id">
                Material Thickness
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-material-thickness-id"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="cutLengthMm"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-cut-length-mm">
                Cut Length (mm)
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-cut-length-mm"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="holesCount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-holes-count">
                Holes Count
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-holes-count"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="setupMin"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-setup-min">
                Setup Time (min)
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-setup-min"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="postMin"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-post-min">
                Post Processing Time (min)
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-post-min"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="engraveLengthMm"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-engrave-length-mm">
                Engrave Length (mm)
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-engrave-length-mm"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="qty"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-qty">Quantity</FieldLabel>
              <Input
                {...field}
                id="form-job-creation-qty"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup className="sm:col-span-2">
        <Controller
          name="customerName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-customer-name">
                Customer Name
              </FieldLabel>
              <Input
                {...field}
                id="form-job-creation-customer-name"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup className="sm:col-span-2">
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-job-creation-notes">Notes</FieldLabel>
              <Textarea
                {...field}
                id="form-job-creation-notes"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
  );
}
