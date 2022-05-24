import { InputProps } from "@chakra-ui/react"
import { SetStateAction,Dispatch } from "react"

export type UploadType = {
    setAvatar:Dispatch<SetStateAction<any>>,
    setImgPreview:Dispatch<SetStateAction<any>>,
    imgPreview:any,
    inputProps:InputProps,
    htmlFor:string

}