import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { Spinner } from "phosphor-react";
import { toast } from "sonner";
import { z } from "zod";
import { createShortenedUrl } from "../api/create-shortened-url";
import * as InputContainer from "../components/input-container";
import { queryClient } from "../lib/react-query";

const createShortenedUrlFormSchema = z.object({
	originalUrl: z
		.string({ required_error: "Campo obrigatório" })
		.url("URL inválida")
		.nonempty("URL original é obrigatória"),
	shortenedUrl: z
		.string()
		.regex(/^[a-z0-9-]+$/, {
			message: "Formato inválido para URL encurtada",
		})
		.refine((val) => !/\s/.test(val), {
			message: "Formato inválido para URL encurtada",
		}),
});

type CreateShortenedUrlFormType = z.infer<typeof createShortenedUrlFormSchema>;

export function ShortenedUrlForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateShortenedUrlFormType>({
		resolver: zodResolver(createShortenedUrlFormSchema),
	});

	const mutation = useMutation({
		mutationFn: ({ originalUrl, shortenedUrl }: CreateShortenedUrlFormType) =>
			createShortenedUrl({ originalUrl, shortenedUrl }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["urls"] });
			reset();
		},
		onError: () => {
			toast.error(
				<div className="flex w-full h-full items-center gap-2">
					<div className="flex flex-col gap-1">
						<p className="text-sm font-bold text-danger">
							{" "}
							URL encurtada já cadastrada
						</p>
					</div>
				</div>,
				{
					style: {
						backgroundColor: "#f29db2",
						color: "#white",
						boxShadow: "none",
						border: "none",
						gap: "1rem",
					},
				},
			);
		},
	});

	const handleCreateShortenedUrl = async (data: CreateShortenedUrlFormType) => {
		const { originalUrl, shortenedUrl } = data;
		mutation.mutate({ originalUrl, shortenedUrl });
	};

	return (
		<form
			className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg self-start"
			onSubmit={handleSubmit(handleCreateShortenedUrl)}
		>
			<p className="text-lg text-gray-600 leading-lg font-bold">Novo link</p>

			<div className="flex flex-col gap-4">
				<InputContainer.Root id="originalUrl" hasError={!!errors.originalUrl}>
					<InputContainer.Label>link original</InputContainer.Label>
					<InputContainer.Input
						type="text"
						placeholder="www.exemplo.com.br"
						{...register("originalUrl")}
					/>
					{errors.originalUrl?.message && (
						<InputContainer.ValidationError
							message={errors.originalUrl.message}
						/>
					)}
				</InputContainer.Root>

				<InputContainer.Root
					id="shortenedUrl"
					prefix="brev.ly/"
					hasError={!!errors.shortenedUrl}
				>
					<InputContainer.Label>link encurtado</InputContainer.Label>
					<InputContainer.Input type="text" {...register("shortenedUrl")} />
					{errors.shortenedUrl?.message && (
						<InputContainer.ValidationError
							message={errors.shortenedUrl.message}
						/>
					)}
				</InputContainer.Root>
			</div>

			<button
				type="submit"
				disabled={mutation.isPending}
				className="disabled:opacity-50 w-full bg-blue-base text-white p-4 rounded-lg text-md leading-md font-semibold hover:bg-blue-dark hover:cursor-pointer"
			>
				{mutation.isPending ? (
					<div className="flex items-center justify-center gap-2">
						<Spinner className="animate-spin" size={20} />
						<span>Salvando...</span>
					</div>
				) : (
					<span>Salvar link</span>
				)}
			</button>
		</form>
	);
}
