import { DownloadSimple, Link } from "phosphor-react";
import logo from "../assets/logo.svg";

export function Home() {
	const isUrlsListEmpty = true;

	return (
		<div className="w-full min-h-full max-w-[1024px] py-8 px-3 grid grid-cols-1 gap-6 mx-auto items-center lg:grid-cols-3">
			<img
				src={logo}
				alt="brev.ly logo"
				className="max-w-28 max-h-8 lg:col-span-3"
			/>

			<form
				action=""
				className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg lg:col-span-1"
			>
				<p className="text-lg text-gray-600 leading-lg font-bold">Novo link</p>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col-reverse gap-2">
						<input
							type="text"
							id="original_url"
							placeholder="www.exemplo.com.br"
							className="peer border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-2 focus:outline-blue-base placeholder:text-gray-400"
						/>
						<label
							htmlFor="original_url"
							className="text-xs text-gray-500 leading-xs uppercase peer-focus:text-blue-base peer-focus:font-bold"
						>
							link original
						</label>
					</div>

					<div className="flex flex-col-reverse gap-2">
						<input
							type="text"
							id="shortened_url"
							className="peer border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-2 focus:outline-blue-base placeholder:text-gray-400"
						/>
						<label
							htmlFor="shortened_url"
							className="text-xs text-gray-500 leading-xs uppercase bg-white px-1 transition-all peer-focus:text-blue-base peer-focus:font-bold"
						>
							link encurtado
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-base text-white p-4 rounded-lg text-md leading-md font-semibold"
				>
					Salvar link
				</button>
			</form>

			<div className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg lg:col-span-2 lg:self-start">
				<div className="flex items-center justify-between">
					<p className="text-lg text-gray-600 leading-lg font-bold">
						Meus links
					</p>

					<button
						type="button"
						className="p-2 flex items-center gap-1.5 bg-gray-200 text-gray-500 rounded-sm"
					>
						<DownloadSimple className="text-gray-600" size={16} />
						<span className="text-sm leading-sm font-semibold">Baixar CSV</span>
					</button>
				</div>
				<div className="border-b-[1px] border-gray-300 w-full bg-gray-100 opacity-55" />
				{isUrlsListEmpty ? (
					<div className="flex flex-col gap-3 items-center p-8">
						<Link size={32} className="text-gray-400" />
						<p className="uppercase text-gray-500 text-xs leading-xs">
							ainda não existem links cadastrados
						</p>
					</div>
				) : (
					<p>lista aqui</p>
				)}
			</div>
		</div>
	);
}
