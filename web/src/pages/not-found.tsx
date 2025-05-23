import { Link } from "react-router-dom";
import not_found_icon from "../assets/404.svg";

export function NotFound() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center px-3">
			<div className="bg-white flex flex-col justify-center items-center gap-6 rounded-lg px-5 py-12">
				<img src={not_found_icon} alt="" />
				<h1 className="text-gray-600 text-xl font-bold leading-xl">
					Link não encontrado
				</h1>
				<div className="flex flex-col gap-1 text-md text-gray-500 font-semibold leading-md text-center px-12">
					<p className="text-center max-w-[485px]">
						O link que você está tentando acessar não existe, foi removido ou é
						uma URL inválida. Saiba mais em{" "}
						<Link
							className="underline text-blue-base hover:text-blue-dark"
							to="/"
						>
							brev.ly.
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
