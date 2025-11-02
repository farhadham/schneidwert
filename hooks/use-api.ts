import type { AppError } from "@/lib/error-handler";
import {
  type MutationFunction,
  type QueryFunction,
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

// Generic API hook for GET requests
export const useApiQuery = <TData>(
  options: UseQueryOptions<TData, AppError> & {
    queryFn: QueryFunction<TData, readonly unknown[]>;
  },
) => {
  return useQuery<TData, AppError>({
    ...options,
    queryFn: async (context) => {
      return await options.queryFn(context);
    },
  });
};

// Generic API hook for mutations (POST, PUT, PATCH, DELETE)
export const useApiMutation = <TData, TVariables, TContext = unknown>(
  options: UseMutationOptions<TData, AppError, TVariables, TContext> & {
    mutationFn: MutationFunction<TData, TVariables>;
    successMessage?: string;
    toastSuccess?: boolean;
    errorMessage?: string;
    toastError?: boolean;
    onCustomSuccess?: (res: TData) => unknown;
    onCustomError?: (err: AppError) => unknown;
    invalidateQueryKeys?: readonly string[];
  },
) => {
  const {
    mutationFn,
    invalidateQueryKeys,
    successMessage = "Success!",
    toastSuccess = true,
    errorMessage,
    toastError = true,
    onCustomSuccess,
    onCustomError,
    ...restOptions
  } = options;
  const queryClient = useQueryClient();

  return useMutation<TData, AppError, TVariables, TContext>({
    mutationFn: async (variables, context) => {
      try {
        const res = await mutationFn(variables, context);
        return res;
      } catch (err) {
        let finalError = err;
        // If we want a custom error message other than what server provides
        if (errorMessage) {
          finalError = new Error(errorMessage);
        }
        throw finalError;
      }
    },
    onSuccess: (res) => {
      // Invalidate queries
      if (invalidateQueryKeys) {
        invalidateQueryKeys.forEach((str) => {
          // Execute the function for each string
          queryClient.invalidateQueries({
            queryKey: [str],
          });
        });
      }

      // Do any callback that we provide for onSuccess
      if (onCustomSuccess) {
        onCustomSuccess(res);
      }

      // Toast success
      if (toastSuccess) {
        toast.success(successMessage);
      }
    },
    onError: (error) => {
      // Do any callback that we provide for onError
      if (onCustomError) {
        onCustomError(error);
      }

      if (error.status >= 500) {
        //TODO Do something with sentry
      }

      if (toastError) {
        toast.error(error.message);
      }
    },
    ...restOptions,
  });
};
