# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run install first

```
npm ci
```
Meaning npm "common install", will install packages based on what is defined in the package-lock.json

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Getting Started with The Template

## Setting up .env files

If you have not used our aws-cdk typescript cognito starter code which can be found here [link] and you don't have
a cognito user pool set up please use that to set one up now.
Documentation on how to use the tool can be found in the repo documentation.

Add the following variables to a .env file

```
REACT_APP_COGNITO_USER_POOL_ID=<YOUR_USER_POOL_ID>
REACT_APP_COGNITO_CLIENT_ID=<BASE_COGNITO_CLIENT_ID>
REACT_APP_USER_POOL_DOMAIN=<USER_POOL_DOMAIN>
REACT_APP_COGNITO_REDIRECT_SIGN_IN=<COGNITO_REDIRECT_SIGN_IN>
REACT_APP_COGNITO_REDIRECT_SIGN_OUT=<COGNITO_REDIRECT_SIGN_OUT>

```

Once all of those values have been set up, go ahead and run npm start.

Your app should be up and running and ready to use our authentication flow. Please have
an authenticator app of your choice ready when creating an account.

## App structure

.
├── README.md
├── package-lock.json
├── package.json
├── public // images, robot.txt, etc.
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── common // Hooks, Context, and Commonly used components
│   ├── index.scss
│   ├── index.tsx
│   ├── pages // Follows next js common paradigm for naming files and folders and placing components under a components directory
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── services
│   │   └── store.tsx
│   ├── setupTests.ts
│   └── styles // Contains all styles
└── tsconfig.json

### Key Notes

- logintabset.tsx contains almost all the login views and components in use.
- CognitoAuthContext contains all the business logic for the login
- Material UI components were leveraged heavily in the making of this template but can be swapped out based on
  your preference.