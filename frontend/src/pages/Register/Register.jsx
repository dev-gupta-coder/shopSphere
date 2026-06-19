import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {
  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="border rounded-lg p-8 shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter full name"
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
          />

          <Button className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;