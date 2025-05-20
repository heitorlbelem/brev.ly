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
		<div id={urlId} className="pr-3 flex items-center justify-between">
			<div className="flex flex-col gap-1 max-w-[145px] truncate sm:max-w-none sm:truncate-none">
				<p className="text-blue-base truncate text-md leading-md font-semibold">
					{url.originalUrl}
				</p>
				<span className="text-gray-500 truncate text-sm leading-sm">
					{url.shortenedUrl}
				</span>
			</div>

			<div className="flex items-center gap-4">
				<span className="text-sm text-gray-500 leading-sm">
					{url.accessesCount === 1
						? "1 acesso"
						: `${url.accessesCount} acessos`}
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
		</div>
	);
}
