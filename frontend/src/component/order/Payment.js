import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextProvider } from '../../service/Context';
import Loader from '../animation/LoaderAnimation';
const Payment = () => {
    const { id } = useParams()
    console.log(id)
    const { orderDetails, paymentStatus, login, placeOrder, removeAllInCart, setVisibleSearch, setMyOrders } = useContext(ContextProvider)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
        // Clear the error message for the field being edited
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        for (const [key, value] of Object.entries(paymentDetails)) {
            if (!value) {
                newErrors[key] = 'Required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)


            console.log(orderDetails);
            const responce = await placeOrder(orderDetails)
            if (responce.success) {

                setMyOrders(responce.order)
               setLoading(false)

                if (id === "xxx") {
                    const remove = await removeAllInCart()
                    if (remove.success) {
                        console.log(remove.cart)
                        navigate("/success")
                    }
                } else {
                    navigate("/success")
                }

            }else{
                setLoading(false)
            }


        }
    };

    useEffect(() => {
        if (!login) {
            navigate('/')
        }
        setVisibleSearch(false)
        if (!paymentStatus) {
            navigate('/orderpage')
        }

    }, [])

    return (
        <div className="flex flex-col items-center w-full sm:px-8 py-8 min-h-screen">
                 {loading && <Loader spinning={loading} />}
            <div className="payment-form flex flex-col gap-4 w-full max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white rounded-lg sm:shadow-md">
                <div className="font-bold text-2xl text-center mb-4">Payment Details</div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col relative">
                        <label htmlFor="cardNumber" className="font-semibold">Card Number:</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.cardNumber ? 'border-red-500' : ''}`}
                            placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.cardNumber}</span>}
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="cardName" className="font-semibold">Cardholder Name:</label>
                        <input
                            type="text"
                            name="cardName"
                            id="cardName"
                            value={paymentDetails.cardName}
                            onChange={handleChange}
                            className={`border rounded-lg p-2 ${errors.cardName ? 'border-red-500' : ''}`}
                            placeholder="John Doe"
                        />
                        {errors.cardName && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.cardName}</span>}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 ">
                        <div className="flex flex-col relative w-full">
                            <label htmlFor="expiryDate" className="font-semibold">Expiry Date:</label>
                            <input
                                type="text"
                                name="expiryDate"
                                id="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handleChange}
                                className={`border rounded-lg p-2 ${errors.expiryDate ? 'border-red-500' : ''} w-full`}
                                placeholder="MM/YY"
                            />
                            {errors.expiryDate && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.expiryDate}</span>}
                        </div>

                        <div className="flex flex-col relative w-full">
                            <label htmlFor="cvv" className="font-semibold">CVV:</label>
                            <input
                                type="text"
                                name="cvv"
                                id="cvv"
                                value={paymentDetails.cvv}
                                onChange={handleChange}
                                className={`border rounded-lg p-2 ${errors.cvv ? 'border-red-500' : ''} w-full`}
                                placeholder="123"
                            />
                            {errors.cvv && <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.cvv}</span>}
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all">Submit Payment</button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
