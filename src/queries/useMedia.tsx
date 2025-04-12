import imgApi from "@/apis/image"
import { useMutation } from "@tanstack/react-query"

export const useUploadImageMutation = () => {
     return useMutation({
          mutationFn: imgApi.uploadImages
     })
} 