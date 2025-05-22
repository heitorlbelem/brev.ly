import * as Scroll from "@radix-ui/react-scroll-area";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DownloadSimple, Link } from "phosphor-react";
import { useCallback, useEffect, useRef } from "react";
import {
	type GetShortenedUrlsResponse,
	getUrls,
} from "../api/get-shortened-urls";
import { ShortenedUrlListItem } from "./shortened-url-list-item";
import { ActionButton } from "./ui/action-button";
import { Divider } from "./ui/divider";

type ShortenedUrlListInfiniteQueryResponse = {
	pageParams: string | null;
	pages: GetShortenedUrlsResponse[];
};

const PAGE_SIZE = 10;

export function ShortenedUrlList() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery<
			GetShortenedUrlsResponse,
			Error,
			ShortenedUrlListInfiniteQueryResponse,
			string[],
			string | null
		>({
			queryKey: ["urls"],
			queryFn: ({ pageParam }) =>
				getUrls({ pageSize: PAGE_SIZE, cursor: pageParam }),
			initialPageParam: null,
			getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
		});

	const urls = data?.pages.flatMap((page) => page.urls) ?? [];
	const isEmpty = urls.length === 0;
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const handleIntersect = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		},
		[fetchNextPage, hasNextPage, isFetchingNextPage],
	);

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersect, {
			threshold: 1,
		});
		const node = loadMoreRef.current;
		if (node) observer.observe(node);
		return () => {
			if (node) observer.unobserve(node);
		};
	}, [handleIntersect]);

	function renderEmptyState() {
		return (
			<>
				<Divider />
				<div className="flex flex-col gap-3 items-center p-8">
					<Link size={32} className="text-gray-400" />
					<p className="uppercase text-gray-500 text-xs leading-xs">
						ainda não existem links cadastrados
					</p>
				</div>
			</>
		);
	}

	function renderUrlList() {
		return (
			<Scroll.Root type="scroll">
				<Scroll.Viewport className="max-h-[480px] overflow-hidden">
					<ul className="flex flex-col">
						{urls.map((url) => (
							<li key={url.id}>
								<Divider />
								<ShortenedUrlListItem url={url} />
							</li>
						))}
						{hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
						{isFetchingNextPage && (
							<div className="text-center py-2 text-xs text-gray-400">
								Carregando mais...
							</div>
						)}
					</ul>
				</Scroll.Viewport>
				<Scroll.Scrollbar
					className="flex touch-none select-none bg-white p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
					orientation="vertical"
				>
					<Scroll.Thumb className="relative flex-1 rounded-[2px] bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
				</Scroll.Scrollbar>
			</Scroll.Root>
		);
	}

	return (
		<section className="w-full flex flex-col bg-white p-6 rounded-lg lg:col-span-2 lg:self-start">
			<header className="flex items-center justify-between">
				<p className="text-lg text-gray-600 leading-lg font-bold">Meus links</p>
				<ActionButton icon={DownloadSimple}>Baixar CSV</ActionButton>
			</header>
			{isEmpty ? renderEmptyState() : renderUrlList()}
		</section>
	);
}
