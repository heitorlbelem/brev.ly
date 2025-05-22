import logo from "../assets/logo.svg";
import { ShortenedUrlForm } from "../components/shortened-url-form";
import { ShortenedUrlList } from "../components/shortened-url-list";

export function Home() {
	return (
		<div className="w-full min-h-full max-w-[1024px] py-8 px-3 flex flex-col gap-6 mx-auto">
			<img src={logo} alt="brev.ly logo" className="max-w-28 max-h-8" />
			<div className="flex flex-col gap-6 lg:flex-row">
				<ShortenedUrlForm />
				<ShortenedUrlList />
			</div>
		</div>
	);
}
