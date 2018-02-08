import { DBSchema } from '@ngrx/db';

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const db_schema: DBSchema = {
    version: 1,
    name: 'itemsDB',
    stores: {
        items: {
            autoIncrement: true,
            primaryKey: 'id'
        },
    },
};
