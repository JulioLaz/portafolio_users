// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'julio-lazarte-cv',
    appId: '1:854128116448:web:f80fdc4b2f50f5d4580685',
    storageBucket: 'julio-lazarte-cv.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyCtVrD7oYLhPqFhDqTvmMBZwga81I_21PM',
    authDomain: 'julio-lazarte-cv.firebaseapp.com',
    messagingSenderId: '854128116448',
  },

  production: false,
  // URL:'https://cv-new.onrender.com/'//https://cv-new.onrender.com
  URL: 'http://localhost:8080/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
