import { Ref, forwardRef } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  size?: string;
}

const FormInput = forwardRef(
  (
    { label, name, type, defaultValue, size }: FormInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text capitalize">{label}</span>
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className={`input input-bordered ${size}`}
          ref={ref}
        />
      </div>
    );
  }
);
export default FormInput;
