# Installation

```shell
cd ./ #root directory of our project
npx core-modules-payment-razorpay-frontend
```

# Dependencies

1. Axios

# Usage

#### Wrapping the component inside Razorpay Provider

```js
// Path will remain same if you are using core-modules-frontend-base
import RazorpayProvider from '../payment/RazorPayProvider';
```

Wrap the component inside `RazorpayProvider` where you want to use Razorpay

```js
<RazorpayProvider>
  <App />
</RazorpayProvider>
```

- This will load the Razorpay script in you application.

## Note

If you are using payment components in more than one components then its, prefered to wrap the whole <App/> component inside the `RazorpayProvider`

#### Using `isLoading` and `isError` state inside the children

```js
// App.js
import { useContext } from 'react';
import RazorPayContext from '../payment/RazorPayProvider';
export default function App() {
  const { isLoading, isError } = useContext(RazorPayContext);
  if (isLoading) {
    return <div>Loading Razorpay</div>;
  }
  if (isError) {
    return <div>Failed to load razorpay</div>;
  }
  return <div>This is app</div>;
}
```

#### Using Pay component to accept payment

```js
import Pay from '../../payment/core/Pay
```

```js
// App.js
export default function App() {
  const { isLoading, isError } = useContext(RazorPayContext);
  if (isLoading) {
    return <div>Loading Razorpay</div>;
  }
  if (isError) {
    return <div>Failed to load razorpay</div>;
  }
  return (
    <div>
      <Pay
        //Required Fields
        razorpayKey="razorpay_key"
        amount={'amount'}
        onSuccess={() => {}}
        onFailure={() => {}}
        name="Test"
        verifyPaymentCallbackUrl="test"
        createOrderCallback="test"
        // Optionals
        address=""
        theme=""
        logo=""
        description=""
      >
        <button>Pay amount</button>
      </Pay>
    </div>
  );
}
```

## Note

`Pay` component accepts any component which have `onClick `attribute. `Pay` will auto take-care of the `onClick `function.
**Although you can pass any html element having onClick attribute it still recommended to use button**

# Props Type and default values

```js
// Props type
Pay.propTypes = {
  razorpayKey: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  logo: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  verifyPaymentCallbackUrl: PropTypes.string.isRequired,
  createOrderCallback: PropTypes.string.isRequired,
  address: PropTypes.string,
  theme: PropTypes.object,
};

// Props default Values
Pay.defaultProps = {
  theme: {
    color: '#008080',
  },
};
```
