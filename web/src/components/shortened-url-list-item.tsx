import { Copy, Trash } from "phosphor-react";

type Url = {
	originalUrl: string;
	shortenedUrl: string;
	createdAt: Date;
	accessesCount: number;
};

interface ShortenedUrlListItemProps {
	url: Url;
	urlId: string;
}

export function ShortenedUrlListItem({
	url,
	urlId,
}: ShortenedUrlListItemProps) {
	return (
		<div id={urlId} className="flex items-center justify-between gap-4">
			<div className="flex flex-col gap-1">
				<p className="max-w-[157px] truncate sm:max-w-none sm:truncate-none text-blue-base text-md leading-md font-semibold">
					{url.originalUrl}
				</p>
				<span className="max-w-[157px] truncate sm:max-w-none sm:truncate-none text-gray-500 text-sm leading-sm">
					{url.shortenedUrl}
				</span>
			</div>

			<span className="text-sm text-gray-500 leading-sm">
				{url.accessesCount === 1 ? "1 acesso" : `${url.accessesCount} acessos`}
			</span>

			<div className="flex items-center gap-1">
				<button
					className="p-2 flex items-center gap-1.5 bg-gray-200 text-gray-500 rounded-sm"
					type="button"
				>
					<Copy />
				</button>
				<button
					className="p-2 flex items-center gap-1.5 bg-gray-200 text-gray-500 rounded-sm"
					type="button"
				>
					<Trash />
				</button>
			</div>
		</div>
	);
}
