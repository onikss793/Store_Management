module.exports = class Dao {
	constructor(database, model) {
		this.database = database;
		this.model = database.models[model];
	}

	async selectAll(index, attributes = ['id']) {
		if (index) {
			return this.model.findAll({ where: { ...index }, attributes });
		} else {
			return this.model.findAll({ attributes });
		}
	}

	async selectOne(index = {}, attributes = ['id']) {
		return this.model.findOne({ where: { ...index }, attributes });
	}

	async insertOne(data, transaction) {
		if (transaction) {
			return this.model.create(data, { transaction });
		} else {
			return this.model.create(data);
		}
	}

	async updateOne(index, data, transaction) {
		if (transaction) {
			return this.model.update({ ...data }, { where: { ...index }, transaction });
		} else {
			return this.model.update({ ...data }, { where: { ...index } });
		}
	}

	async upsertOne(data, transaction) {
		if (transaction) {
			return this.model.upsert(data, { transaction });
		} else {
			return this.model.upsert(data);
		}
	}
};
