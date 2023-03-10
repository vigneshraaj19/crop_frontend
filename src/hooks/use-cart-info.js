import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [points, setPoint] = useState(0);
    const { cart_products } = useSelector((state) => state.cart);

    useEffect(() =>
     {
        const cart = cart_products.reduce((cartTotal, cartItem) => {
            const { originalPrice, orderQuantity,croppoints} = cartItem;
            const itemTotal = originalPrice * orderQuantity;
            const pointTotal =croppoints * orderQuantity;
            cartTotal.total += itemTotal; 
            cartTotal.quantity += orderQuantity;
            cartTotal.points +=pointTotal;

            return cartTotal;
        }, 
        {
            total: 0,
            quantity: 0,
            points:0
        })
        setQuantity(cart.quantity);
        setTotal(cart.total);
        setPoint(cart.points);


    }, [cart_products])

    return {
        quantity,
        total,
        points,
        setTotal,
        
    }
}

export default useCartInfo;