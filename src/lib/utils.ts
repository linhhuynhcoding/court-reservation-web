import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { GlobarError, HttpError, ValidationError } from "./http"
import jwt from "jsonwebtoken"
import { toast } from "sonner"
import { TokenPayload } from "../constants/types"

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
        description: error.payload.error as string,

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

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};

export function toQueryString(params: Record<string, unknown>): string {
  const query = new URLSearchParams();

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  }

  return `?${query.toString()}`;
}

export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

export const genCourtName = (NoC: number) => {
  return range(1, NoC).map((i) => 'A' + (i - 1));
}

export const processTimeBooking = (time: string, duration: number) => {
  const timeInMinute = Number(time.split(":")[0])*60 + Number(time.split(":")[1]) + duration * 60;
  const fromHour = Math.floor(timeInMinute / 60);
  const fromMinute = timeInMinute % 60;

  return time + " - " + fromHour.toString().padStart(2, "0") + ":" + fromMinute.toString().padStart(2, "0");
}
