import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('address.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists address (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => resolve(),
                (_, err) => reject(err)
            );
        });
        return promise;
    });
} 

export const inserAddress = (title, image, address, coords) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'insert into address (title, image, address, coords) values (?, ?, ?, ?);',
                [title, image, address, JSON.stringify(coords)],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            );
        });
        
    });
    return promise;
}

    export const getAddress = () => {
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'select * from address;',
                    [],
                    (_, result) => resolve(result),
                    (_, err) => reject(err)
                );
            });
            
        });
        return promise;
    }

