import React from 'react';
import { WhiteBlock } from '../white-block';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface CheckoutPaymentFormProps {
  className?: string
}

export const CheckoutPaymentForm: React.FC<CheckoutPaymentFormProps> = ({ className }) => {
    const [paymentType, setPaymentType] = React.useState<string | undefined>(undefined);

    const {
        register,
        setValue,
        clearErrors,
        watch,
        formState: { errors },
    } = useFormContext();

    const errorText = errors['paymentType']?.message as string;

    const handePaymentChange = (value: string) => {
        setPaymentType(value);
        setValue('paymentType', value);
        clearErrors('paymentType');
    }

  return (
    <WhiteBlock title='4. Оплата' className={className}>
        <input type="hidden" {...register('paymentType')} />
        <Select value={paymentType} onValueChange={handePaymentChange}>
            <SelectTrigger className="w-full sm:w-1/2 h-12 text-md text-foreground">
                <SelectValue placeholder="Оберіть спосіб оплати" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem className='text-[15px]' value="allPayment">Передплата</SelectItem>
                <SelectItem className='text-[15px]' value="postPayment">Післяплата (завдаток 200 грн)</SelectItem>
            </SelectContent>
        </Select>
        <span className='ml-2 text-gray-400 text-sm'>Оплата через WayForPay</span>

        {paymentType === 'postPayment' && (
            <>
                <br />
                <br />
                <span className='text-gray-600 text-sm'><span className='font-bold'>Комісія Нової пошти за накладений платіж складає: </span><br />

                    2% від суми платежу + 20 грн — якщо отримувач сплачує готівкою або через NovaPay/мобільний додаток <br />

                    Якщо оплата відбувається банківською карткою у терміналі або в додатку — тариф зростає до 3,8 %</span>
            </>
        )}
        {errorText && <ErrorText text={errorText} />}
    </WhiteBlock>
  );
};
