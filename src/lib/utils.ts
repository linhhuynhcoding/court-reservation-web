import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { GlobarError, HttpError, ValidationError } from "./http"
import GlobalError from "next/dist/client/components/error-boundary"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof ValidationError && setError) {
    error.payload.error.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    });

  } else {
    if (error instanceof GlobarError || error instanceof HttpError) {
      toast.error("Có lỗi xảy ra", {
        description: error.payload.message,

        duration: duration ?? 2000,
      }
      );
    }
    else {
      toast.error("Có lỗi xảy ra", {
        description: "Có lỗi xảy ra, vui lòng thử lại sau.",
        duration: duration ?? 2000,
      });
    }
  }
}

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("accessToken") : null;

export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem("refreshToken") : null;

export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser ? localStorage.setItem("accessToken", value) : null;

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser ? localStorage.setItem("refreshToken", value) : null;

export const removeTokensFromLocalStorage = () => {
  if (isBrowser) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};