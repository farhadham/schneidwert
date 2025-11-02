import { AlertCircleIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function ErrorAlert({
  children,
  title = "An Error Happened",
}: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
