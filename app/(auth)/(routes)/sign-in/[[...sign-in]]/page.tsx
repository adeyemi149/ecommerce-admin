import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return <SignIn appearance={{
		elements: {
			formButtonPrimary:
				"bg-black hover:bg-slate-800",
			footerActionLink:
				"text-cyan-500 hover:text-cyan-600"
		}
	}} />;
}