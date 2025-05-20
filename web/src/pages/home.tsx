import logo from "../assets/logo.svg";
import { ShortenedUrlForm } from "../components/shortened-url-form";
import { ShortenedUrlList } from "../components/shortened-url-list";

export function Home() {
	return (
		<div className="w-full min-h-full max-w-[1024px] py-8 px-3 grid grid-cols-1 gap-6 mx-auto items-center lg:grid-cols-3">
			<img
				src={logo}
				alt="brev.ly logo"
				className="max-w-28 max-h-8 lg:col-span-3"
			/>
			<ShortenedUrlForm />
			<ShortenedUrlList />
		</div>
	);
}
