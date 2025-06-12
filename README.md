# ForkIt Mobile

Hi we are the founders of ForkIt 🍴
an app that takes the frustration out of dining by making menus more intuitive.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Demo Video

![ForkIt Demo](./assets/demo.mov)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app
   The app should is developed by React Native framework, which suppose to be cross-platform. Yet, we only tested on iOS device in the current stage. You
   can install [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/) while
   setting up your dev environment.

   ```bash
    # build on iOS simulator
    npm run ios
    # build on your dev device
    npm run ios:device
   ```

   [Expo Go](https://expo.dev/go) is not working as we set up the Firebase Auth which is not compatible with Expo Go.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Build and Distribute the app

### EAS Build and TestFlight Submission

1. Make sure you have EAS CLI installed:

   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:

   ```bash
   eas login
   ```

3. Link your Apple Developer Program account:

   ```bash
   eas credentials
   ```

   Follow the prompts to:

   - Select your project
   - Choose iOS platform
   - Link your Apple Developer account (you'll need your Apple ID and password)

4. Build for iOS:

   ```bash
   eas build --platform ios
   ```

5. Submit to TestFlight:
   ```bash
   eas submit --platform ios
   ```
   For more detailed instructions, refer to the [EAS Build documentation](https://docs.expo.dev/build/introduction/) and [EAS Submit documentation](https://docs.expo.dev/submit/introduction/).
