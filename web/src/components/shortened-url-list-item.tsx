import { Copy, Trash } from "phosphor-react";
import { ActionButton } from "./ui/action-button";

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
				<p className="text-blue-base border-b border-b-transparent truncate text-md leading-md font-semibold hover:text-blue-dark hover:cursor-pointer hover:border-b-blue-dark">
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
					<ActionButton icon={Copy} />
					<ActionButton icon={Trash} />
				</div>
			</div>
		</div>
	);
}
