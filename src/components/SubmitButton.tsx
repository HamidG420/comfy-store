import { useNavigation } from 'react-router-dom';

interface SubmitButtonProps {
  text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          Sending
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};
export default SubmitButton;
