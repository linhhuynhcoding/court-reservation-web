import { IoMdNotifications } from "react-icons/io"
import { useAppContext } from "./app-provider";
import { getAccessTokenFromLocalStorage } from "@/lib/utils";
import { useMemo } from "react";
import { useGetUserNoti } from "@/queries/useNoti";
import { NotiResponse } from "@/schemas/noti.schema";
import { Badge } from "./ui/badge";

export const Notification: React.FC = () => {
     const { account } = useAppContext();
     const token = useMemo(() => getAccessTokenFromLocalStorage(), [account]);
     const { data } = useGetUserNoti(token ?? "");
     const noti: NotiResponse[] = useMemo(() => data?.payload.data ?? [], [data]);

     return <>
          <div className="relative mr-2 group hover:bg-sky-200 rounded-2xl p-1 flex items-center justify-center hover:cursor-pointer">
               <Badge className="absolute top-0 right-1 w-[15px] text-white h-[15px] p-1 bg-red-700 rounded-3xl">
                    {noti.length}
               </Badge>
               <IoMdNotifications className="text-sky-700 " size={26} />
               <div className="scale-0 group-hover:scale-100 transition-all duration-300 ">
                    <NotificationPopup messages={noti} />
               </div>
          </div>
     </>
}

interface MessageProps {
     message: NotiResponse;
}
export const NotificationMessage: React.FC<MessageProps> = ({ message }) => {
     return (
          <div className="flex flex-col border-b p-2 min-h-[100px]">
               <div className="text-2xs text-blue-800 font-semibold">{message.title}</div>
               <div className="text-xs flex-1 font-extralight">{message.message}</div>
               <div className="text-xs text-right font-bold text-primary">HỆ THỐNG</div>
          </div>
     )

}

interface NotificationPopupProps {
     messages: NotiResponse[];
}
export const NotificationPopup: React.FC<NotificationPopupProps> = ({ messages }) => {
     return (
          <div className="relative">
               <div className="rounded-lg absolute border border-sky-700 top-[15px] right-0 bg-white w-[300px] h-[400px]
                shadow-lg flex flex-col ">
                    <div className="sticky min-h-[80px] border-b p-4">
                         <h1 className="text-xl font-semibold">Thông báo</h1>

                    </div>
                    <div className="p-1 overflow-y-auto [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full">
                         {
                              messages.length > 0 ? messages.map((message, index) => (
                                   <NotificationMessage key={index} message={message} />
                              )) : <div className="text-center text-gray-500">Không có thông báo nào</div>
                         }
                    </div>

               </div>
          </div>

     )

}