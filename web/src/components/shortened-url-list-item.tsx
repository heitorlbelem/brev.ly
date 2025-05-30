import { useMutation } from "@tanstack/react-query";
import { Copy, Info, Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { deleteShortenedUrl } from "../api/delete-shortened-url";
import type { GetShortenedUrlsResponse } from "../api/get-shortened-urls";
import { env } from "../env";
import { queryClient } from "../lib/react-query";
import { ActionButton } from "./ui/action-button";

interface ShortenedUrlListItemProps {
	url: {
		originalUrl: string;
		shortenedUrl: string;
		createdAt: string;
		accessesCount: number;
	};
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

	const handleCopyToClipboard = () => {
		try {
			navigator.clipboard.writeText(
				`${env.VITE_FRONTEND_URL}/${url.shortenedUrl}`,
			);
			toast.success(
				<div className="flex w-full h-full items-center gap-2">
					<div className="flex flex-col gap-1">
						<p className="text-sm font-bold text-blue-base">
							{" "}
							Link copiado com sucesso
						</p>
						<span className="font-normal text-sm text-blue-base">
							O link <strong>{url.shortenedUrl}</strong> foi copiado para a área
							de transferência.
						</span>
					</div>
				</div>,
				{
					style: {
						backgroundColor: "#E0F2FE",
						color: "#1D4ED8",
						boxShadow: "none",
						border: "none",
						gap: "1rem",
					},
					duration: 3500,
					icon: <Info size={18} />,
				},
			);
		} catch (error) {}
	};

	return (
		<div className="pr-3 flex items-center justify-between">
			<div className="flex flex-col gap-1 max-w-[145px] lg:max-w-[240px] truncate sm:max-w-none sm:truncate-none">
				<Link
					to={`/${url.shortenedUrl}`}
					target="_blank"
					className="text-blue-base border-b border-b-transparent truncate text-md leading-md font-semibold hover:text-blue-dark hover:cursor-pointer hover:border-b-blue-dark"
				>
					{`${env.VITE_FRONTEND_URL}/${url.shortenedUrl}`}
				</Link>
				<span className="text-gray-500 max-w-[145px] lg:max-w-[240px] truncate text-sm leading-sm">
					{url.originalUrl}
				</span>
			</div>

			<div className="flex items-center gap-4">
				<span className="text-sm text-gray-500 leading-sm">
					{url.accessesCount === 1
						? "1 acesso"
						: `${url.accessesCount} acessos`}
				</span>

				<div className="flex items-center gap-1">
					<ActionButton onClick={handleCopyToClipboard}>
						<Copy size={16} className="text-gray-400" />
					</ActionButton>
					<ActionButton
						onClick={() => {
							confirm(
								`Você tem certeza que deseja excluir o link ${url.shortenedUrl}?`,
							) && deleteShortenedUrlFn({ shortenedUrl: url.shortenedUrl });
						}}
					>
						<Trash size={16} className="text-gray-400" />
					</ActionButton>
				</div>
			</div>
		</div>
	);
}
