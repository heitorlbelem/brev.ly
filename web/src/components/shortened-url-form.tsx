import * as InputContainer from "../components/input-container";

export function ShortenedUrlForm() {
	return (
		<form
			action=""
			className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg lg:col-span-1 self-start"
		>
			<p className="text-lg text-gray-600 leading-lg font-bold">Novo link</p>

			<div className="flex flex-col gap-4">
				<InputContainer.Root id="original_url">
					<InputContainer.Label>link original</InputContainer.Label>
					<InputContainer.Input
						type="text"
						id="original_url"
						placeholder="www.exemplo.com.br"
					/>
				</InputContainer.Root>

				<InputContainer.Root id="shortened_url" prefix="brev.ly/">
					<InputContainer.Label>link encurtado</InputContainer.Label>
					<InputContainer.Input type="text" id="shortened_url" />
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
