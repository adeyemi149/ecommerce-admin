import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return <SignUp appearance={{
		elements: {
			formButtonPrimary:
				"bg-black hover:bg-slate-800",
			footerActionLink:
				"text-cyan-500 hover:text-cyan-600"
		}
	}}
	/>;
}