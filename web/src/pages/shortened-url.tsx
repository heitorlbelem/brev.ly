import logoIcon from "../assets/logo_icon.svg";

export function ShortenedUrl() {
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
							href="http://google.com"
						>
							Acesse aqui
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
