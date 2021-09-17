//Components
import Button from '@material-ui/core/Button';
//Tyoes
import { CartItemType } from '../App';
//Styles
import { Wrapper } from './DialogItem.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
    dialogClose: () => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, dialogClose }) => (
    <Wrapper>
        <h2><b>{item.title}</b></h2>
        <img src={item.image} alt={item.title} width='95%'/>
        <div>
            <h4>Category: {item.category}</h4>
            <h4>ID: {item.id}</h4>
            <h4>Description: </h4>
            <p>{item.description}</p>
            <h4>Price: {item.price}</h4>
        </div>
        <Button type="button"
        onClick={() => handleAddToCart(item)}>
            Add to Cart    
        </Button>
        <Button type="button" className="btn-close" onClick={dialogClose}>Close</Button>
    </Wrapper>
);
export default Item;