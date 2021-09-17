import Button from '@material-ui/core/Button';
import {MouseEventHandler} from 'react';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleSelectItem: (selectedItem: CartItemType) => MouseEventHandler;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, handleSelectItem }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} onClick={handleSelectItem(item)} />
    <div onClick={handleSelectItem(item)}>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
);

export default Item;
