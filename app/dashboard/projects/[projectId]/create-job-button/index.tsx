"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateJobForm from "./form";

type Props = {
  projectId: string;
};

export default function CreateJobButton({ projectId }: Props) {
  const [open, setOpen] = useState(false);

  const handleModalClose = () => {
    setOpen(false);
  };

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

        <CreateJobForm projectId={projectId} onClose={handleModalClose} />
      </DialogContent>
    </Dialog>
  );
}
