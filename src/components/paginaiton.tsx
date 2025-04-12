import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"
import { PaginationLink } from "./ui/pagination"
import { cn } from "@/lib/utils"

export function PaginationFirst({
     className,
     ...props
}: React.ComponentProps<typeof PaginationLink>) {
     return (
          <PaginationLink
               aria-label="Go to previous page"
               size="default"
               className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
               {...props}
          >
               <FiChevronsLeft />
          </PaginationLink>
     )
}

export function PaginationLast({
     className,
     ...props
}: React.ComponentProps<typeof PaginationLink>) {
     return (
          <PaginationLink
               aria-label="Go to previous page"
               size="default"
               className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
               {...props}
          >
               <FiChevronsRight />
          </PaginationLink>
     )
}
