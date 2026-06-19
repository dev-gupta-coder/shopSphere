import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../../features/cart/cartSlice";

import { updateCartItem, removeCartItem } from "../../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (!cart || !cart.items) {
    return <h1>Cart Empty</h1>;
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,

    0,
  );

  return (
    <div
      className="
   max-w-6xl
   mx-auto
   p-8"
    >
      <h1
        className="
    text-3xl
    font-bold
    mb-6"
      >
        My Cart
      </h1>

      {cart.items.map((item) => (
        <div
          key={item._id}
          className="
      flex
      gap-4
      border-b
      py-4"
        >
          <img
            src={item.product.images?.[0]}
            alt={item.product.title}
            className="
       w-24
       h-24
       object-cover"
          />

          <div>
            <h2>{item.product.title}</h2>

            <p>₹{item.product.price}</p>

            <div
              className="
                    flex
                    gap-2
                    items-center
                    mt-2"
            >
              <button
                onClick={() =>
                  dispatch(
                    updateCartItem({
                      productId: item.product._id,

                      quantity: item.quantity - 1,
                    }),
                  )
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch(
                    updateCartItem({
                      productId: item.product._id,

                      quantity: item.quantity + 1,
                    }),
                  )
                }
              >
                +
              </button>
              <button
  onClick={() => {

    if (item.quantity > 1) {

      dispatch(
        updateCartItem({
          productId: item.product._id,
          quantity: item.quantity - 1,
        })
      );

    }

  }}
>
  -
</button>
            </div>
          </div>
        </div>
      ))}

      <div
        className="
    mt-8
    text-xl
    font-bold"
      >
        Total: ₹{total}
      </div>
    </div>
  );
}

export default Cart;
