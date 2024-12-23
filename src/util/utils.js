const dbName = 'ImageCacheDB';
const storeName = 'images';

// Utility function to open the database and handle upgrades
const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 2);

        request.onupgradeneeded = (event) => {
            console.log('onupgradeneeded triggered');
            const db = request.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id' });
                console.log(`Object store "${storeName}" created`);
            }
        };

        request.onsuccess = () => {
            console.log('Database opened successfully');
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error opening database:', request.error);
            reject(request.error);
        };
    });
};

// Fetch Image from IndexedDB
const fetchImageFromIndexedDB = async (key) => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const getRequest = store.get(key);

            getRequest.onsuccess = () => {
                console.log(`Fetched image with key "${key}"`);
                resolve(getRequest.result?.data || null);
            };

            getRequest.onerror = (e) => {
                console.error('Get request error:', e.target.error);
                reject(e.target.error);
            };
        });
    } catch (error) {
        console.error('Error during fetch operation:', error);
        throw error;
    }
};

// Save Image to IndexedDB
const saveImageToIndexedDB = async (key, imageData) => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        store.put({ id: key, data: imageData });

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                console.log(`Image with key "${key}" saved to IndexedDB`);
                resolve();
            };

            transaction.onerror = (e) => {
                console.error('Transaction error:', e.target.error);
                reject(e.target.error);
            };
        });
    } catch (error) {
        console.error('Error during save operation:', error);
        throw error;
    }
};

export { fetchImageFromIndexedDB, saveImageToIndexedDB }