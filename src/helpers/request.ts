type RequestParams = { url: string; method: string };

export const request =
	(baseUrl: string) =>
		async ({ url, method }: RequestParams): Promise<Response> => {
			try {
				const response = await fetch(`${baseUrl}/${url}`, {
					method,
					headers: {
						accept: "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(response.statusText);
				}

				return response;
			} catch (e) {
				throw new Error((e as Error).message);
			}
		};
