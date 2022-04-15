import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Cart from "../../components/Cart/Cart";

const CartPage = () => {
  // const [{ isPending }] = usePayPalScriptReducer();

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AedUl7FBOysFzsQRicbJ7TJ84vvT_A4Gv48iGVOq2uffCaiBStE0M2BsTlymVQzZJ-ddknhzfUQfhXGg",
        components: "buttons",
        currency: "USD",
        "disable-funding": "credit,card,p24",
      }}
    >
      <Cart />
    </PayPalScriptProvider>
  );
};

export default CartPage;
