export function ShortenedUrlForm() {
	return (
		<form
			action=""
			className="w-full flex flex-col gap-5 bg-white p-6 rounded-lg lg:col-span-1"
		>
			<p className="text-lg text-gray-600 leading-lg font-bold">Novo link</p>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col-reverse gap-2">
					<input
						type="text"
						id="original_url"
						placeholder="www.exemplo.com.br"
						className="peer border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-2 focus:outline-blue-base placeholder:text-gray-400"
					/>
					<label
						htmlFor="original_url"
						className="text-xs text-gray-500 leading-xs uppercase peer-focus:text-blue-base peer-focus:font-bold"
					>
						link original
					</label>
				</div>

				<div className="flex flex-col-reverse gap-2">
					<input
						type="text"
						id="shortened_url"
						className="peer border border-gray-300 rounded-lg p-4 text-gray-600 text-md leading-md focus:outline-2 focus:outline-blue-base placeholder:text-gray-400"
					/>
					<label
						htmlFor="shortened_url"
						className="text-xs text-gray-500 leading-xs uppercase bg-white px-1 transition-all peer-focus:text-blue-base peer-focus:font-bold"
					>
						link encurtado
					</label>
				</div>
			</div>

			<button
				type="submit"
				className="w-full bg-blue-base text-white p-4 rounded-lg text-md leading-md font-semibold"
			>
				Salvar link
			</button>
		</form>
	);
}
