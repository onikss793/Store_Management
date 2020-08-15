const { StoreService, BrandService, EmployeeService } = require('../services');

module.exports = async database => {
	let transaction;
	const seedfunctions = [seedStore, seedBrand, seedEmployee];

	try {
		transaction = await database.transaction();

		const tasks = seedData(database, transaction);
		tasks.addTasks(seedfunctions);

		await Promise.all(tasks.getTasks());
		await transaction.commit();
		
		console.log('[[ MIGRATE ]]: SET SEED DATA SUCCESS!');
		return true;
	} catch (e) {
		if (transaction) await transaction.rollback();
		throw e;
	}
};

function seedData(database, transaction) {
	const task = [];

	return {
		getTasks: () => task,
		addTasks: (list) => {
			list.forEach(func => {
				task.push(func(database, transaction));
			});
		}
	};
}

async function seedEmployee(database, transaction) {
	const employeeService = new EmployeeService(database);
	return employeeService.createEmployee({
		employee_name: '조인호',
		phone_number: '010-1234-1234',
		store_id: 1
	}, transaction);
}

async function seedBrand(database, transaction) {
	const brandService = new BrandService(database);
	return brandService.createBrand({ brand_name: '삼성' }, transaction);
}

async function seedStore(database, transaction) {
	const storeService = new StoreService(database);
	return storeService.createStore({
		store_name: 'master',
		password: 'password',
		is_admin: true,
		brand_id: 1
	}, transaction);
}
