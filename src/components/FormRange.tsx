import { useState } from 'react';
import { formatPrice } from '../utils';

interface FormRangeProps {
  label: string;
  name: string;
  size: string;
  price: string;
}
const FormRange = ({ label, name, size, price }: FormRangeProps) => {
  const step = 1000; // 1000 cent = 10 dollar -> step of range input is 10$
  const maxPrice = '100000'; // maxPrice = 1000$
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);
  const dollarsSelectedPriceAmount = formatPrice(String(selectedPrice));
  const dollarsMaxAmount = formatPrice(String(maxPrice));

  return (
    <div className="form-control">
      <label htmlFor={name} className="mb-3">
        <span className="label-text capitalize">{label}</span>
        <span>{dollarsSelectedPriceAmount}</span>
      </label>
      <input
        type="range"
        id={name}
        name={name}
        min={0}
        max={maxPrice}
        step={step}
        value={selectedPrice}
        onChange={(event) => setSelectedPrice(event.target.value)}
        className={`range range-secondary ${size}`}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold">0</span>
        <span className="font-bold">Max: {dollarsMaxAmount}</span>
      </div>
    </div>
  );
};
export default FormRange;
