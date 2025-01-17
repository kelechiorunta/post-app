/* eslint-disable no-restricted-globals */

// Your service worker code

const CACHE_NAME = 'app-cache';
const addToCahe = async(req, res) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(req, res)
}

const cacheFirst = async({req, preloadResponsePromise}) => {
    const responseCache = await caches.match(req);
    if (responseCache) {
        return responseCache
    }

    if (preloadResponsePromise) {
        addToCahe(req, preloadResponsePromise.clone())
        return preloadResponsePromise
    }

    try{
        const networkCache = await fetch(req.clone());
        if (networkCache) {
            addToCahe(req, networkCache.clone());
            return networkCache
        }
    }catch(err){
        console.error(err)
    }
}
const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        // Enable navigation preload
        await self.registration.navigationPreload.enable();
    }
};
self.addEventListener('activate', (event) => {
    
    // event.postMessage({ action: 'showSpinner' });

    event.waitUntil(
        (async () => {
            // Enable navigation preload
            await enableNavigationPreload();

            // Clean up old caches
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })()
    );
});


self.addEventListener('install', async(event) => {
    console.log('Service Worker installed');
    event.waitUntil(
        (async () => {
        await caches.open(CACHE_NAME)
        console.log('Caching assets')
    })()
)
    
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    // if (event.request.destination !== 'style') {
        event.respondWith(
            (async () => {
                const preloadResponse = await event.preloadResponse;
                return cacheFirst({
                    req: event.request,
                    preloadResponsePromise: preloadResponse,
                });
            })()
        );
    // }
});
