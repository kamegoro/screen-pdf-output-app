import type { PageServerLoad } from './$types';
import { faker } from '@faker-js/faker';

faker.locale = 'ja';

export const load: PageServerLoad = async ({ url: { searchParams } }) => {
	const user = searchParams.get('user');
	const numberOfArray = (() => {
		if (!user || !Number(user) || Number(user) < 0) {
			return 30;
		}

		// 出力されるPDFのページが増えるとブラウザがクラッシュする
		if (Number(user) >= 100) {
			return 100;
		}

		return Number(user);
	})();

	return {
		users: Array(numberOfArray)
			.fill('')
			.map((_, i) => ({
				name: faker.name.fullName(),
				email: faker.internet.email(),
				description: faker.commerce.productDescription(),
				imgUrl: i % 2 ? '/man.png' : '/woman.png'
			}))
	};
};
