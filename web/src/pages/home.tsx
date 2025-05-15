import { DownloadSimple } from "phosphor-react";
import logo from "../assets/logo.svg";

export function Home() {
	return (
		<div className="w-full min-h-full py-8 px-3 flex flex-col gap-6 items-center">
			<img src={logo} alt="brev.ly logo" className="max-w-28 max-h-8" />

			<form
				action=""
				className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg"
			>
				<p className="text-lg text-gray-600 leading-lg font-bold">Novo link</p>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="original_url"
							className="text-xs text-gray-500 leading-xs uppercase"
						>
							link original
						</label>
						<input
							type="text"
							id="original_url"
							placeholder="www.exemplo.com.br"
							className="border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-none focus:border-blue-base placeholder:text-gray-400"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="shortened_url"
							className="text-xs text-gray-500 leading-xs uppercase"
						>
							link encurtado
						</label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-md leading-md">
								brev.ly/
							</span>

							<input
								type="text"
								id="shortened_url"
								className="pl-[60px] pr-4 py-4 w-full border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-none focus:border-blue-base placeholder:text-gray-400"
							/>
						</div>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-base text-white p-4 rounded-lg text-md leading-md font-semibold"
				>
					Salvar link
				</button>
			</form>

			<div className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg">
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
			</div>
		</div>
	);
}
