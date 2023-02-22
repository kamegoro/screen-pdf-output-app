import type { PageServerLoad } from './$types';
import { faker } from '@faker-js/faker';

faker.locale = 'ja';

export const load: PageServerLoad = async () => {
	return {
		users: Array(20)
			.fill('')
			.map(() => ({
				name: faker.name.fullName(),
				email: faker.internet.email(),
				description: faker.commerce.productDescription()
			}))
	};
};
