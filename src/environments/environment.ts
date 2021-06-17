// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Environment } from './interfaces';

export const environment: Environment = {
  production: false,
  URL_FRONT: "http://localhost:8100/",
  URL_API: "http://localhost:3000/v1",
  URL_IMAGE: "http://localhost:3112/v1",
  URL_SOCKET: "http://localhost:3000",
  URL_CHALLENGE: "http://localhost:1000",
  URL_WEB:'http://localhost:8100',
  title:"Sportyeah local"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
