import { Form } from 'react-router-dom';
import { FormInput, SubmitButton } from '.';

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitButton text="Place your order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
