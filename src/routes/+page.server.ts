import type { PageServerLoad } from './$types';
import { faker } from '@faker-js/faker';

faker.locale = 'ja';

export const load: PageServerLoad = async ({ url: { searchParams } }) => {
	const limit = searchParams.get('limit');
	const numberOfArray = (() => {
		if (!limit || !Number(limit) || Number(limit) < 0) {
			return 50;
		}

		if (Number(limit) >= 200) {
			return 200;
		}

		return Number(limit);
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
