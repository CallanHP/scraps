### Dummy Pass-through Application for ACCS Caching Services

This little application is designed to provide access to the ACCS Caching Service APIs documented [here](http://docs.oracle.com/en/cloud/paas/app-container-cloud/capra/api-Use%20Caches.html) to external applications to enable local testing. As it exposes data sources directly, with no security, do not load sensitive data into caches to which this is bound while this is running.

To deploy to ACCS, call ```npm install``` to download the required node_modules, then zip the resulting files up and upload as a Node.js application. The application will not function unless a Caching Service binding is setup.

This sample code is provided as-is with no warranty or guarantees, it has not been tested extensively.