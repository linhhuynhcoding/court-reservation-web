import { CartItem } from "./cart-item";

const CartPage: React.FC = () => {
     return (
          <div className="w-full flex justify-center">
               <div className="w-[80%] bg-pink-100 min-h-dvh p-4 grid grid-cols-[1.5fr_1fr] gap-4">
                    <div className="bg-red-100 p-4">
                         <CartItem></CartItem>
                    </div>
                    <div className="bg-red-100"></div>
               </div>
          </div>
     )
}

export default CartPage;