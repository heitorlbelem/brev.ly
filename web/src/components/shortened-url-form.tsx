import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
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
				<InputContainer.Root id="originalUrl">
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

				<InputContainer.Root id="shortenedUrl" prefix="brev.ly/">
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
				className="w-full bg-blue-base text-white p-4 rounded-lg text-md leading-md font-semibold hover:bg-blue-dark hover:cursor-pointer"
			>
				Salvar link
			</button>
		</form>
	);
}
