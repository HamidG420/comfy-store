interface FormSelectProps {
  label: string;
  name: string;
  list: string[];
  defaultValue?: string;
  size: string;
}

const FormSelect = ({
  label,
  name,
  list,
  defaultValue,
  size,
}: FormSelectProps) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`select select-bordered ${size}`}
      >
        {list.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};
export default FormSelect;
