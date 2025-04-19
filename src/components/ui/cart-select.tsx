import { FaCheck } from "react-icons/fa";

interface CardSelectProps {
     isSelected?: boolean;
     onClick?: (value: string) => void;
     value: string;
     title?: string;
     description?: string;
}

export const CardSelect: React.FC<CardSelectProps> = ({ title, value, isSelected = false, onClick = (value: string) => { } }) => {

     const handleClick = (newValue: string) => {
          if (onclick) {
               onClick(newValue);
          }
     }

     return (
          <div onClick={() => onClick(value)} 
               className={
                    `w-full border border-dashed border-blue-900 rounded-lg min-h-20 p-4 ` +
                    `hover:border-solid hover:border-1 hover:shadow hover:cursor-pointer ` +
                    `${isSelected && 'border-solid border-2'}`
               }>
               <div className="flex justify-between">
                    <h1 className="text-normal font-semibold text-blue-800">{title}</h1>
                    {isSelected && <FaCheck size={16} className="text-blue-900" />}
               </div>
          </div>
     )
}