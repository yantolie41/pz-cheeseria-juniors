import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import ProductItem from './DialogItem/DialogItem';
import Drawer from '@material-ui/core/Drawer';
import RecentPurchase from './RecentPurchase/PurchaseItem/PurchaseItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// Types
//    For Shopping Cart   //
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

//    For Purchase Item  //
export type PurchaseItemType = {
  id: number;
  items: CartItemType[];
}

//  GET Request   //
const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const getPurchases = async (): Promise<PurchaseItemType[]> =>
  await (await fetch(`api/purchaseHistory`)).json();

const App = () => {
  //shopping cart
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  //dialog pop up window
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItemType | undefined>();
  //purchase
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  console.log(data);

  const {data: PurchaseData, isLoading: PurchaseIsLoading, error:PurchaseError, refetch: purchaseRefetch} = useQuery<PurchaseItemType[]>(
    'purchases',
    getPurchases
  );
  console.log(PurchaseData);

//    Helper    //
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

//    Dialog Item Functionality   //
  const handleSelectItem = (item: CartItemType | undefined) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedItem(item);
    setDialogOpen(true);
  };

//    Shopping Cart Functionality   //
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      setDialogOpen(false);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };


// Purchase Functionality   //
  const sendPurchaseRequest = async () => {
    await (await fetch('api/newPurchases', {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(cartItems)
  }).then(response => {console.log(response)}))
  

    //clear the shopping cart
    setCartItems([] as CartItemType[]);

    //show the message
    alert("Your item(s) has been successfully placed!");

    //close cart after finished request
    setCartOpen(false);
};

  const getPurchaseRecord = async() =>{
    purchaseRefetch();
    setPurchaseOpen(true)
  }

  if (PurchaseIsLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton data-cy="open-recent-purchase" onClick={() => getPurchaseRecord()}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton data-cy="open-cart" onClick={() => setCartOpen(true) }>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>
      
      <Drawer anchor='left' open={purchaseOpen} onClose={() => setPurchaseOpen(false)}>
          <RecentPurchase purchases={PurchaseData || []} purchaseViewClosed={() => setPurchaseOpen(false)}/>
      </Drawer>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          sendPurchaseRequest={sendPurchaseRequest}
          close={() => setCartOpen(false)}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data!.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} handleSelectItem={handleSelectItem}/>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          {selectedItem && <ProductItem item ={selectedItem} handleAddToCart={handleAddToCart} dialogClose={() => setDialogOpen(false)}/>} 
      </Dialog> 
    </Wrapper>

  );
};

export default App;
