import TableCourtView from "./table-view";

export default function CourtManager() {
     return (
          <div className="flex flex-col items-center justify-start min-h-screen pl-2 pr-2 ">
               <h1 className="text-3xl font-bold">Admin</h1>
               <p className="text-lg">Welcome to the admin panel!</p>
               <TableCourtView>
                    
               </TableCourtView>
          </div>
     )
}