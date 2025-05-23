import { useQueryClient } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { accessShortenedUrl } from "../api/access-shortened-url";
import { getShortenedUrl } from "../api/get-shortened-url";
import logoIcon from "../assets/logo_icon.svg";
import { NotFound } from "./not-found";

export function ShortenedUrl() {
	const [originalUrl, setOriginalUrl] = useState<string | null>(null);
	const { shortened_url: shortenedUrlParam } = useParams<{
		shortened_url: string;
	}>();
	const queryClient = useQueryClient();

	if (!shortenedUrlParam) {
		return <NotFound />;
	}

	useEffect(() => {
		const fetchUrl = async () => {
			try {
				const response = await getShortenedUrl({
					shortenedUrl: shortenedUrlParam,
				});
				const { originalUrl, shortenedUrl } = response;

				await accessShortenedUrl({ shortenedUrl });
				setOriginalUrl(originalUrl);
				window.location.replace(originalUrl);
				queryClient.invalidateQueries({ queryKey: ["urls"] });
			} catch (error) {
				window.location.href = "/urls/not-found";
			}
		};

		fetchUrl();
	}, [shortenedUrlParam, queryClient]);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center px-3">
			<div className="bg-white flex flex-col justify-center items-center gap-6 rounded-lg px-5 py-12">
				<img src={logoIcon} alt="" className="w-12 h-12" />
				<h1 className="text-gray-600 text-xl font-bold leading-xl">
					Redirecionando...
				</h1>
				<div className="flex flex-col gap-1 text-md text-gray-500 font-semibold leading-md text-center">
					<p>O link será aberto automaticamente em alguns instantes.</p>
					<p>
						Não foi redirecionado?{" "}
						<a
							className="underline text-blue-base hover:text-blue-dark"
							href={originalUrl ?? "#"}
						>
							Acesse aqui
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
