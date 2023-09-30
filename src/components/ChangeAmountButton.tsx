interface ChangeAmountButtonProps {
  sign: string;
  onAmountAmountHandler: () => void;
}

const ChangeAmountButton = ({
  sign,
  onAmountAmountHandler,
}: ChangeAmountButtonProps) => {
  return (
    <button
      type="button"
      className="btn btn-link flex items-center border-none no-underline	hover:no-underline hover:text-accent"
      onClick={onAmountAmountHandler}
    >
      <span className="text-3xl text-secondary">{sign}</span>
    </button>
  );
};
export default ChangeAmountButton;
