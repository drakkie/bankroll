// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB57yis24XFsxCOtaszAQWNynB6H2qg6vE",
    authDomain: "bankrollingdb.firebaseapp.com",
    databaseURL: "https://bankrollingdb.firebaseio.com",
    projectId: "bankrollingdb",
    storageBucket: "bankrollingdb.appspot.com",
    messagingSenderId: "363035935821"
  }
};
