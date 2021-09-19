import Button from '@material-ui/core/Button';
import Purchaselayout from '../PurchaseList/PurchaseList';
import { PurchaseItemType } from '../../App';
import { Wrapper } from './PurchaseItem.styles';


type Props = {
    purchases: PurchaseItemType[];
    purchaseViewClosed: () => void;
}

const RecentPurchase: React.FC<Props> = ({purchases, purchaseViewClosed}) => {
    return (
        <Wrapper>
            <h2>Your Recent Purchase(s)</h2>
            <hr/>
            {purchases.length === 0 ? <p>No Item In Cart.</p> : null}
            {purchases.map(item => (
                <Purchaselayout 
                    key={item.id}
                    items={item.items}
                />
            ))} 
            <Button type="button" className="btn-close" onClick={purchaseViewClosed}>Close</Button>  
        </Wrapper>
    );
};

export default RecentPurchase;