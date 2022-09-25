
export type PagseguroPayment = {
    reference_id: string
    description: string;
    amount: Amount;
    payment_method: Payment
    recurring: Recurring;
    notification_urls: string[];
    metadata: Metadata;
}

export type AmountCapturePayment = {
    amount: {
        value: number;
    }
}

type Amount = {
    value: number;
    currency: string;
}

type Payment = {
    type: string;
    installments: number | string;
    capture: boolean;
    card: CardType;
}

type CardType ={
    number: string;
    exp_month: string;
    exp_year: string;
    security_code: string;
    holder: Holder;
}

type Holder = {
    name: string;
}

type Recurring = {
    type: string;
}

type Metadata = {
    Exemplo: string;
    NotaFiscal: string;
    idComprador: string;
}