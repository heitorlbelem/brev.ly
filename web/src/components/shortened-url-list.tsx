import { DownloadSimple, Link } from "phosphor-react";

export function ShortenedUrlList() {
	const isUrlsListEmpty = true;

	return (
		<div className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg lg:col-span-2 lg:self-start">
			<div className="flex items-center justify-between">
				<p className="text-lg text-gray-600 leading-lg font-bold">Meus links</p>

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
	);
}
