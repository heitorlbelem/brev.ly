import { useMutation } from "@tanstack/react-query";
import { Copy, Trash } from "phosphor-react";
import { deleteShortenedUrl } from "../api/delete-shortened-url";
import type { GetShortenedUrlsResponse } from "../api/get-shortened-urls";
import { queryClient } from "../lib/react-query";
import { ActionButton } from "./ui/action-button";

type Url = {
	originalUrl: string;
	shortenedUrl: string;
	createdAt: string;
	accessesCount: number;
};

interface ShortenedUrlListItemProps {
	url: Url;
}

export function ShortenedUrlListItem({ url }: ShortenedUrlListItemProps) {
	const { mutateAsync: deleteShortenedUrlFn } = useMutation({
		mutationFn: deleteShortenedUrl,

		onSuccess: (__, { shortenedUrl }) => {
			queryClient.setQueryData<{
				pages: GetShortenedUrlsResponse[];
				pageParams: unknown[];
			}>(["urls"], (oldData) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map((page) => ({
						...page,
						urls: page.urls.filter(
							(item) => item.shortenedUrl !== shortenedUrl,
						),
					})),
				};
			});
		},
	});

	return (
		<div className="pr-3 flex items-center justify-between">
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
					<ActionButton
						icon={Copy}
						onClick={() =>
							url.originalUrl && navigator.clipboard.writeText(url.originalUrl)
						}
					/>
					<ActionButton
						icon={Trash}
						onClick={() => {
							deleteShortenedUrlFn({ shortenedUrl: url.shortenedUrl });
						}}
					/>
				</div>
			</div>
		</div>
	);
}
