import { AddManagerForm } from "./add-manager-form";

const Page: React.FC = () => {
     return (
          <div className="bg-white pl-4 pr-4 rounded-md h-full flex flex-col gap-4 items-center justify-center">
               <div>
                    <h1 className="font-bold text-light text-xl">
                         Thêm tài khoản quản lý
                    </h1>
               </div>
               <div className="p-10 rounded-md border w-fit min-w-[400px]">
                    <AddManagerForm></AddManagerForm>
               </div>
          </div>
     )
}

export default Page;