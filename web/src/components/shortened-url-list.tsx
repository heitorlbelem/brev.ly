import * as Scroll from "@radix-ui/react-scroll-area";
import { DownloadSimple, Link } from "phosphor-react";
import { ShortenedUrlListItem } from "./shortened-url-list-item";

export function ShortenedUrlList() {
	const isUrlsListEmpty = false;
	const urls = [
		{
			id: "1",
			originalUrl: "https://www.exemplo.com.br",
			shortenedUrl: "brev.ly/abc123",
			createdAt: new Date(),
			accessesCount: 1,
		},
		{
			id: "2",
			originalUrl: "https://www.exemplo2.com.br",
			shortenedUrl: "brev.ly/def456",
			createdAt: new Date(),
			accessesCount: 20,
		},
		{
			id: "3",
			originalUrl: "https://www.exemplo3.com.br",
			shortenedUrl: "brev.ly/ghi789",
			createdAt: new Date(),
			accessesCount: 0,
		},
		{
			id: "4",
			originalUrl: "https://www.exemplo4.com.br",
			shortenedUrl: "brev.ly/jkl012",
			createdAt: new Date(),
			accessesCount: 30,
		},
		{
			id: "5",
			originalUrl: "https://www.exemplo5.com.br",
			shortenedUrl: "brev.ly/mno345",
			createdAt: new Date(),
			accessesCount: 10,
		},
		{
			id: "6",
			originalUrl: "https://www.exemplo6.com.br",
			shortenedUrl: "brev.ly/pqr678",
			createdAt: new Date(),
			accessesCount: 245,
		},
		{
			id: "7",
			originalUrl: "https://www.exemplo7.com.br",
			shortenedUrl: "brev.ly/stu901",
			createdAt: new Date(),
			accessesCount: 0,
		},
		{
			id: "8",
			originalUrl: "https://www.exemplo8.com.br",
			shortenedUrl: "brev.ly/vwx234",
			createdAt: new Date(),
			accessesCount: 5,
		},
		{
			id: "9",
			originalUrl: "https://www.exemplo9.com.br",
			shortenedUrl: "brev.ly/yza567",
			createdAt: new Date(),
			accessesCount: 100,
		},
	];

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
				<Scroll.Root type="scroll">
					<Scroll.Viewport className="max-h-[280px] overflow-hidden">
						{Array.from(urls).map((url) => {
							return (
								<ShortenedUrlListItem key={url.id} urlId={url.id} url={url} />
							);
						})}
					</Scroll.Viewport>
					<Scroll.Scrollbar className="flex w-0 " orientation="vertical" />
				</Scroll.Root>
			)}
		</div>
	);
}
