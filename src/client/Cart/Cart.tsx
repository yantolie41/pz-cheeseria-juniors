import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  sendPurchaseRequest: () => void;
  close: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, sendPurchaseRequest, close}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      <hr/>
      {cartItems.length === 0 ? <h3>No Item In Cart</h3> : null}
      
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))
      }
      {cartItems.length === 0 && 
        <div>
          <Button type="button" className="btn-close" onClick={close}>Close</Button> 
        </div>
      }
      {cartItems.length > 0 &&
      <div>
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button type="button" className="btn-purchase" onClick={sendPurchaseRequest}>Purchase</Button>
      <Button type="button" className="btn-close" onClick={close}>Close</Button> 
      </div>
      }
    </Wrapper>
  );
};

export default Cart;
