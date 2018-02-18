const path = require('path');
const fs = require('fs');

const importSchema = absolutePath => {
	return fs.readFileSync(path.join(...absolutePath), 'utf8');
};

const mergeSchemas = schemas => {
	return schemas.join('');
};

module.exports = {
	importSchema,
	mergeSchemas,
};
