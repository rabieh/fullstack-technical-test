import styles from "../styles/Cart.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./api/cart";
import { setCartItems } from "../redux/cart.slice";

function Cart() {
  const cart = useSelector(state => state.cart)
  const router = useRouter()
  const dispatch = useDispatch();

  const { cartId } = router.query
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Panier
        </h1>
        {cartId ? (
          <div>
            <div>
              <button onClick={async () => refreshCart(dispatch, cartId)}>Refresh Cart</button>
            </div>
            <div>
              <ul>
                {
                  cart.items.map(item => {
                    return (
                      <li key={item.objectID}>
                        {item.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        ) : (
          <div>No cart Id specified</div>
        )}
      </main>
    </div>
  )
}

async function refreshCart(dispatch, cartId) {
  const res = await getCartItems(cartId);
  dispatch(setCartItems(res.items))
}

export default Cart;
