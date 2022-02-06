import styles from "../styles/Home.module.css";
import algoliasearch from "algoliasearch/lite";
import { connectHits, InstantSearch, Pagination, SearchBox } from 'react-instantsearch-dom';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, createCart, removeItemFromCart } from "./api/cart";
import { addToCart, removeFromCart, setCartId } from "../redux/cart.slice";
import Link from "next/link";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

function Home() {
  const cart = useSelector(state => state.cart);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {cart.id && (
          <div className='row'>
            <div className='col-12 float-end link-dark'>
              <Link href={`/cart?cartId=${cart.id}`}>Go to Cart</Link>
            </div>
          </div>
        )}
        <div>
          <InstantSearch indexName="bestbuy" searchClient={searchClient}>
            <SearchBox/>
            <CustomHits/>
            <Pagination/>
          </InstantSearch>
        </div>

      </main>
    </div>
  );
}

const CustomHits = connectHits(({ hits }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    if (hits && hits.length > 0) {
      return (
        <div className="row p-4">
          {hits.map(hit => (
            <div
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 p-3 text-center card"
              key={hit.objectID}
            >
              <div>
                <img src={hit.image} alt={hit.name} className={styles.itemImage}/>
              </div>
              <div className='pt-3'>
                {hit.name}
              </div>
              <div className='pb-2'>
                {hit.salePrice}$
              </div>
              <div>
                {!isItemAdded(cart, hit) ? (
                  <button
                    onClick={async () => await addItem(dispatch, cart, hit)}
                    className='btn btn-primary'
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={async () => await removeItem(dispatch, cart, hit)}
                    className='btn btn-primary btn-danger'
                  >
                    Remove From Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div>No results found</div>
      )
    }
  }
);

async function addItem(dispatch, cart, item) {
  if (!cart.id) {
    const response = await createCart()
    const id = response.id;
    if (id) {
      dispatch(setCartId(id))
      await addItemToCart(id, item)
    }
  } else {
    await addItemToCart(cart.id, item)
  }
  dispatch(addToCart(item))
}

async function removeItem(dispatch, cart, item) {
  const cartId = cart.id;
  const itemId = item.objectID;
  await removeItemFromCart(cartId, itemId)
  dispatch(removeFromCart(item))
}

function isItemAdded(cart, item): boolean {
  const index = cart.items.findIndex(i => i.objectID === item.objectID)
  return index !== -1;
}


export default Home;
