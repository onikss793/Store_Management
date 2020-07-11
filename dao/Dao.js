module.exports = class Dao {
	constructor(database, model) {
		this.database = database;
		this.model = database.models[model];
	}

	selectAll(index, attributes = ['id']) {
		return this.model.findAll({ where: { ...index }, attributes });
	}

	selectOne(index = {}, attributes = ['id']) {
		return this.model.findOne({ where: { ...index }, attributes });
	}

	insertOne(data, transaction) {
		if (transaction) {
			return this.model.create(data, { transaction });
		} else {
			return this.model.create(data);
		}
	}

	updateOne(index, data, transaction) {
		if (transaction) {
			return this.model.update({ ...data }, { where: { ...index }, transaction });
		} else {
			return this.model.update({ ...data }, { where: { ...index } });
		}
	}

	upsertOne(data, transaction) {
		if (transaction) {
			return this.model.upsert(data, { transaction });
		} else {
			return this.model.upsert(data);
		}
	}
};
