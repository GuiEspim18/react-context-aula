import { createContext, useContext, useState } from "react";

export const PaymentContext = createContext();
PaymentContext.displayName = "PaymentContext";

export const PaymentProvider = ({ children }) => {
    const paymentTypes = [
        {
            name: "Boleto",
            fees: 1,
            id: 1
        },
        {
            name: "Cartão de crédito",
            fees: 1.3,
            id: 2
        },
        {
            name: "Pix",
            fees: 1,
            id: 3
        },
        {
            name: "Crediário",
            fees: 1.5,
            id: 4
        }
    ]
    const [paymentForm, setPaymentForm ] = useState(paymentTypes[0]);
    return (
        <PaymentContext.Provider value={{paymentTypes, paymentForm, setPaymentForm}}>
            {children}
        </PaymentContext.Provider>
    );
}

export const usePayment = () => {
    const { paymentForm, paymentTypes, setPaymentForm } = useContext(PaymentContext)

    function change(id) {
        const payment = paymentTypes.find(element => element.id === id)
        setPaymentForm(payment)
    }

    return {paymentForm, paymentTypes, change}
}