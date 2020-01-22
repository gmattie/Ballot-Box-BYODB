/**
 * @description This module contains code to register and handle a service worker.
 * Service workers facilitate in caching resources so the application can load faster
 * on subsequent visits as well as work offline for progress web app functionality.
 * However, caching resources also means that deployed updates will only be available
 * when all existing browser tabs related to the application have been closed.
 * Service workers only run in production mode.
 * 
 * Additional info:  https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/making-a-progressive-web-app.md
 * 
 * @public
 * @module
 * 
 */

/**
 * @description Determines if the location.hostname is localhost.
 * [::1] is the IPv6 localhost address while 127.0.0.0/8 are considered localhost for IPv4.
 * 
 * @public
 * @constant
 * 
 */
const isLocalhost = Boolean(

    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

/**
 * @description Registers the service worker.
 * The "process.env.PUBLIC_URL" must share the same origin as the application.
 * Therefore, registration of a service worker will fail if a CDN is used to serve assets.

 * @param {object|null} config - Optional object containing callback handlers for "onSuccess" and/or "onUpdate".
 * @public
 * @function
 * 
 */
export function register(config = null) {

    if (process.env.NODE_ENV === "production" && navigator.serviceWorker) {

        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        
        if (publicUrl.origin !== window.location.origin) {

            return;
        }

        window.addEventListener("load", () => {

            const swURL = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {

                checkValidServiceWorker(swURL, config);

                navigator.serviceWorker.ready.then(() => {
                    
                    console.warn("This web app is being served cache-first by a service worker.");
                });
            }
            else {
                
                registerValidSW(swURL, config);
            }
        });
    }
}

/**
 * @description Checks if a valid service worker is present.
 * If a valid service worker is found, it will be registered.
 * Otherwise, the page will be reloaded.
 * 
 * @param {string} swURL - The URL of the service worker.
 * @param {object|null} config - Optional object containing callback handlers for "onSuccess" and/or "onUpdate".
 * @private
 * @function
 * 
 */
function checkValidServiceWorker(swURL, config = null) {

    fetch(swURL, {

            headers: { "Service-Worker": "script" }
        })
        .then(response => {

            const contentType = response.headers.get("content-type");
            
            if (response.status === 404 || (contentType != null && contentType.indexOf("javascript") === -1)) {

                navigator.serviceWorker.ready
                    .then((registration) => {

                        registration.unregister()
                            .then(() => {

                                window.location.reload();
                            });
                    });
            }
            else {

                registerValidSW(swURL, config);
            }
        })
        .catch(() => console.warn("No internet connection found. App is running in offline mode."));
}

/**
 * @description Registers the valid service worker.
 * Registering a service worker installs a service worker controller that
 * caches application assets for faster loading and offline functionality.
 * 
 * @param {string} swURL - The URL of the service worker.
 * @param {object|null} config - Optional object containing callback handlers for "onSuccess" and/or "onUpdate".
 * @private
 * @function
 * 
 */
function registerValidSW(swURL, config) {

    navigator.serviceWorker
        .register(swURL)
        .then(registration => {
            
            registration.onupdatefound = () => {
            
                const installingWorker = registration.installing;
                
                if (installingWorker == null) {
          
                    return;
                }

                installingWorker.onstatechange = () => {

                    if (installingWorker.state === "installed") {

                        if (navigator.serviceWorker.controller) {

                            console.info("New content is available and will be used when all tabs for this page are closed.");

                            if (config && config.onUpdate) {

                                config.onUpdate(registration);
                            }
                        }
                        else {

                            console.info("Content is cached for offline use.");

                            if (config && config.onSuccess) {

                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => console.error("Error during service worker registration:", error));
}

/**
 * @description Unregister a service worker.
 * 
 * @public
 * @function
 * 
 */
export function unregister() {

    if (navigator.serviceWorker) {

        navigator.serviceWorker.ready
            .then((registration) => registration.unregister());
    }
}