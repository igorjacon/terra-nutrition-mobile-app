# terra-nutrition-mobile-app

## Development Workflow

First, you will need to install NodeJS. You can do this here: https://nodejs.org/
The latest version with long term support is version 20.11.1

Next you will need to install the latest version of Angular. You can do this through the command line using NodeJS with the following:
```
npm install -g @angular/cli@latest
```
to ensure it is installed, type 'ng version' in the commandline and it should say version 17.3.2

Next we will need to install the latest version of Ionic. You can do this through the command line using NodeJS with the following:
```
npm install -g @ionic/cli@latest
```
to ensure it is installed, type 'ionic -v' in the commandline and it should say version 7.2.0

You should now have all the necessary software to run the app locally.

Once the app is opened, open a terminal within your code editor and then enter the app folder (e.g. 'cd appName')
From here, you can type 
```
ionic serve
```
in the terminal to open the app in the browser.


## Installing the necessary software to run this app on an emulator

First Capactior will need to be installed. You can do this through the command line using NodeJS with the following:

```
npm i @capacitor/core
```

and then
```
npm i -D @capacitor/cli
```

to ensure you have it installed, type 
```
npx cap --version
```
and it should say version 5.7.4


## Adding Capacitor to the project for IOS

This step is for the initial set up of ios in the project, if already added, proceed to the next step (emulating the app on Xcode)

Using the terminal while in the root project directory, type:

```
npm install @capacitor/ios
```

and then
```
npx cap add ios
```

Now the project is set up for emulation


## Emulating the app on Xcode

Ensure the Xcode is installed, this can be done here: https://developer.apple.com/xcode/

Now, while in the root project directory of the app using terminal type:

```
npx cap copy ios
```

This will create some additional files in the app.

Locate the ios folder within your project directory. 
It will contain an Xcode project file named after your app. 
Open this file in Xcode.

In Xcode, ensure you have a simulator connected or launched (use the "Window" -> "Devices and Simulators" menu). 
Choose the desired simulator version if needed.

Click the "Run" button (triangle icon) in the top left corner of Xcode. This will build and launch your 
Ionic Angular app on the connected simulator.

## Run Ionic app on xCode

Ensure the Xcode is installed, this can be done here: https://developer.apple.com/xcode/

#### Build the web app
```
ng build
```

#### Copy web assets
```
npx cap sync
``` 

#### Run the app on ios
```
npx cap run ios
```
