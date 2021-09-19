import React from 'react';
import { CartItemType } from '../../App';
import { Wrapper } from './PurchaseList.styles';

type Props = {
    items: CartItemType[];
}

const CartItem: React.FC<Props> = ({items}) => {
  // calculate the total price per each order for the list
  const totalprice = (items : CartItemType[]) => 
  items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
    return (
        <Wrapper>
          <div>
          {items.map(item => (
                <div className="container" key={item.id}>
                  <p><a>{item.amount} x {item.title}</a> <span className={"price"}>${item.price}</span></p>
                </div>  
          ))}
          <p><b>Total Price:</b><span className="price"><b>${totalprice(items).toFixed(2)}</b></span></p>
          </div>
        </Wrapper>
      )
};

export default CartItem;