import FormAddCourt from "./form-add";

export default function AddCourtPage() {
     return (
          <div className="flex flex-col pl-5 pr-5 gap-4">
               <h1 className="text-3xl font-bold">Thêm sân bóng</h1>
               <div className="border bg-white rounded-lg w-full p-10 ">
                    <FormAddCourt></FormAddCourt>
               </div>
          </div>
     )
} 