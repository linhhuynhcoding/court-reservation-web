"use client";
import { PiCourtBasketballFill } from "react-icons/pi";
import { getAccessTokenFromLocalStorage } from "@/lib/utils";
import { useStatisticSystem } from "@/queries/useStatistic";
import { SystemStatisticResponse } from "@/schemas/statistic.schema";
import { ReactElement, ReactNode, useMemo } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import LocationChart from "./location_chart";
import { LocationTable } from "./location_table";

const Dashboard: React.FC = () => {

     const token = getAccessTokenFromLocalStorage();
     const { data } = useStatisticSystem(token ?? "");

     const statistic: SystemStatisticResponse = useMemo(() => data?.payload?.data, [data]);

     return (
          <div className="dashboard-container">
               <h1 className="text-3xl font-semibold">Dashboard</h1>
               {/* <p>Welcome to the admin dashboard!</p> */}
               <div className="grid grid-cols-2 grid-cols-[2fr_1fr] gap-6">
                    <div>
                         <div>
                              {/* <h2 className="text-2xl font-semibold mt-4">Doanh thu</h2> */}
                              <div className="grid 2xl:grid-cols-3 md:grid-cols-3 gap-4 mt-4 ">

                                   <StatisticCard title="Doanh thu" value={(statistic?.totalRevenueBooking?.toLocaleString("vi-VN") ?? 0) + "đ"} color="teal" type="money" />
                                   <StatisticCard title="Tổng số lượt booking" value={statistic?.bookingTimes?.toLocaleString("vi-VN") ?? 0} color="pink" type="booking" />
                                   <StatisticCard title="Người dùng" value={statistic?.totalUsers ?? 0} color="orange" type="user" />
                              </div>
                         </div>
                         <div>
                              <h2 className="text-2xl font-semibold mt-4">Thống kê</h2>
                              <div className="grid 2xl:grid-cols-3 md:grid-cols-3 gap-4 mt-4 ">
                                   <StatisticCard title="Tổng sân bóng" value={statistic?.totalOrganisations ?? 0} color="cyan" type="court" />
                                   <div></div>
                                   <div></div>
                                   <StatisticCard title="Đang hoạt động" value={statistic?.totalOrganisationsOpening ?? 0} color="green" type="court" />
                                   <StatisticCard title="Đang bảo trì" value={statistic?.totalOrganisationsMaintaining ?? 0} color="yellow" type="court" />
                                   <StatisticCard title="Đang đóng cửa" value={statistic?.totalOrganisationsClosed ?? 0} color="red" type="court" />
                                   {/* <StatisticCard title="Người dùng" value={statistic?.totalUsers ?? 0} color="orange" type="user" />
                         <StatisticCard title="Người dùng" value={statistic?.totalUsers ?? 0} color="orange" type="user" /> */}

                              </div>
                         </div>
                    </div>
                    <div className="">
                         <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-8 w-full mt-4">

                              <LocationTable data={statistic?.revenueBookingLocations ?? []}></LocationTable>
                         </div>

                    </div>
               </div>
          </div>
     )
}

export const Icon: { [index: string]: ReactElement } = {
     "user": <FaUser className="text-white text-2xl" />,
     "court": <PiCourtBasketballFill className="text-white text-2xl" />,
     "money": <MdOutlineAttachMoney className="text-white text-2xl" />,
     "booking": <FaPlus className="text-white text-2xl" />

}

export const Colors: { [index: string]: { gradient: string, bg: string } } = {
     "orange": { gradient: "bg-gradient-to-r from-white via-orange-50 to-orange-100", bg: "bg-orange-400" },
     "green": { gradient: "bg-gradient-to-r from-white via-green-50 to-green-100", bg: "bg-green-400" },
     "cyan": { gradient: "bg-gradient-to-r from-white via-cyan-50 to-cyan-100", bg: "bg-cyan-400" },
     "yellow": { gradient: "bg-gradient-to-r from-white via-yellow-50 to-yellow-100", bg: "bg-yellow-400" },
     "red": { gradient: "bg-gradient-to-r from-white via-red-50 to-red-100", bg: "bg-red-400" },
     "teal": { gradient: "bg-gradient-to-r from-white via-teal-50 to-teal-100", bg: "bg-teal-400" },
     "pink": { gradient: "bg-gradient-to-r from-white via-pink-50 to-pink-100", bg: "bg-pink-400" },
}

const StatisticCard: React.FC<{ title: string, value: number | string, color?: string, type: string }> = ({ title, value, color = "", type = "user" }) => {
     const viaColor50 = `via-${color}-50`;
     const toColor100 = `to-${color}-100`;
     const bgColor400 = `bg-${color}-400`;

     return (
          <div className={`flex flex-col justify-between gap-4 bg-white p-4 rounded-lg shadow min-h-[140px] ` + Colors[color].gradient} >
               <div className="flex gap-4 items-center ">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${Colors[color].bg} text-white`}>
                         {Icon[type]}
                    </div>
                    <div className="">
                         <h3 className="text-base  font-light text-gray-600">{title}</h3>
                         <h3 className="text-3xl       font-thin">{value}</h3>
                    </div>
               </div>
          </div>
     )
}

export default Dashboard;
