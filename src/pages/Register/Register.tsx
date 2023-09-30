import { useEffect, useRef } from 'react';
import { FormInput, SubmitButton } from '../../components';
import { Form, Link, useNavigation } from 'react-router-dom';

const Register = () => {
  // Use formRef & useNavigation to reset the form and focus on the first input
  const formRef = useRef<HTMLFormElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();
  const isRegistering = navigation.state === 'submitting';
  useEffect(() => {
    formRef.current?.reset();
    firstInput.current?.focus();
  }, [isRegistering]);

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 flex flex-col gap-y-4 bg-neutral shadow-lg"
        ref={formRef}
      >
        <h4 className="text-3xl text-center font-bold">Register</h4>
        <FormInput
          type="text"
          label="Username"
          name="username"
          ref={firstInput}
        />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-4">
          <SubmitButton text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
