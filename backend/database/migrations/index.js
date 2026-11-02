import * as initialSchema from './001-initial-schema.js';
import * as userAccessColumns from './002-user-access-columns.js';
import * as defaultCategories from './003-seed-default-categories.js';

export const migrations = [initialSchema, userAccessColumns, defaultCategories];
