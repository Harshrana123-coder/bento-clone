import SignupAnimation from '@/components/SignupAnimation';
import SignupFlow from '@/components/SignupFlow';
import useRedirectIfAuth from '@/hooks/useRedirectIfAuth';

const SignUp = () => {
  useRedirectIfAuth(); // 👈 ADD THIS LINE

  return (
    <div className="flex lg:flex-row p-7 sm:p-16 max-w-[1728px] w-full min-h-screen mx-auto">
      <div className="flex max-w-[675px] flex-1 flex-col items-center justify-center">
        <SignupFlow />
      </div>
      <div className="hidden lg:flex flex-1 z-10 max-w-[675px] flex-col items-center justify-center w-full h-full">
        <SignupAnimation />
      </div>
    </div>
  );
};

export default SignUp;
