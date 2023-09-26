import React, { useContext } from 'react';
import { RazorPayContext } from '../RazorPayProvider';
import loadRazorpay from './RazorpayLoader';
import PropTypes from 'prop-types';
import axios from 'axios';
export default function Pay(props) {
  const { setIsLoading, setIsError } = useContext(RazorPayContext);
  const displayRazorPay = async () => {
    try {
      setIsLoading(true);
      const res = await loadRazorpay();
      if (!res) {
        setIsError(true);
        console.log('Razorpay error: Failed to load razorpay');
        return;
      }
    } catch (error) {
      setIsError(true);
      console.log('Razorpay load error: ', error);
    } finally {
      setIsLoading(false);
    }

    let result;
    try {
      result = await axios.post(props.createOrderCallback, {
        amount: props.amount,
      });
    } catch (error) {
      setIsError(true);
      console.log(error);
    }

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }
    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;
    const options = {
      key: props.razorpayKey, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(), // 100p = 1ruppe
      currency: currency,
      name: props.name,
      description: props.description,
      image: props.logo,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          await axios.post(props.verifyPaymentCallbackUrl, data);
          props.onSuccess();
        } catch (error) {
          props.onFailure();
          setIsError(true);
          console.log('Payment error: ', error);
        }
      },
      notes: {
        address: props.address,
      },
      theme: {
        ...props.theme,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const ButtonWithOnClick = () => {
    if (React.isValidElement(props.children)) {
      return React.cloneElement(props.children, { onClick: displayRazorPay });
    }
    return props.children;
  };
  return <ButtonWithOnClick />;
}

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
  children: PropTypes.element,
};
Pay.defaultProps = {
  theme: {
    color: '#008080',
  },
};
