# React Native Setup Guide for macOS
This guide will walk you through the setup process for developing React Native applications on macOS, with support for both Android and iOS.

## Prerequisites:
Before you begin, make sure you have the following prerequisites installed on your macOS machine:

### Node.js:
Install the latest stable version of Node.js by visiting the official Node.js website or by using a version manager like nvm.

### Watchman:
Watchman is a file-watching service by Facebook that is required by React Native. Install it using Homebrew by running the following command in your terminal:

```brew install watchman```

### Java Development Kit (JDK):

Instal the OpenJDK distribution called **Azul Zulu** using Homebrew. Run the following commands in a Terminal after installing [Homebrew](https://brew.sh/):

```
brew tap homebrew/cask-versions
brew install --cask zulu11

# Get path to where cask was installed to double-click installer
brew info --cask zulu11 
```

# Android development environment:
Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.
### Install Android Studio:
[Download and install Android Studio](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:
- Android SDK
- Android SDK Platform
- Android Virtual Device

### Install the Android SDK:
Select the `SDK Platforms` tab from within the SDK Manager, then check the box next to `Show Package Details` in the bottom right corner. Look for and expand the `Android 13 (Tiramisu)`  entry, then make sure the following items are checked:
-Android SDK Platform 33
-Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image or (for Apple M1 Silicon) Google APIs ARM 64 v8a System Image

Next, select the `SDK Tools` tab and check the box next to `Show Package Details` here as well. Look for and expand the `Android SDK Build-Tools` entry, then make sure that 33.0.0 is selected.
Finally, click "Apply" to download and install the Android SDK and related build tools.
### Configure the ANDROID_HOME environment variable:
The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your ` ~/.zprofile`  or ` ~/.zshrc ` (if you are using bash, then `~/.bash_profile` or `~/.bashrc`) config file:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Run `source ~/.zprofile` (or `source ~/.bash_profile` for bash) to load the config into your current shell. Verify that `ANDROID_HOME` has been set by running `echo $ANDROID_HOME` and the appropriate directories have been added to your path by running `echo $PATH`.

# IOS development environment:
You will need a Ruby version manager, Xcode and CocoaPods.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

## Ruby:
Ruby is a general-purpose programming language. React Native uses in some scripts related to the iOS dependency management. As every programming language, there are different versions of Ruby that have been developed during the years.

React Native uses a .ruby-version file to make sure that your version of Ruby is aligned with what is needed. Currently, macOS 13.2 is shipped with Ruby 2.6.10, which is not what is required by this version of React Native (2.7.6). Our suggestion is to install a Ruby version manager and to install the proper version of Ruby in your system.

Some common Ruby version manager are:

- rbenv
- RVM
- chruby
- asdf-vm with the asdf-ruby plugin
To check what is your current version of Ruby, you can run this command:

`ruby --version`

React Native [uses this version of Ruby](https://github.com/facebook/react-native/blob/v0.71.3/.ruby-version). You can also find which version your specific project needs in the .ruby-version file at root of your RN project.

### Ruby's Bundler:
Ruby uses the concept of **gems** to handle its own dependencies. You can think of a gem as a package in NPM, a formula in Homebrew or a single pod in CocoaPods.

Ruby's [Bundler](https://bundler.io/) is a Ruby gem that helps managing the Ruby dependencies of your project. We need Ruby to install CocoaPods and using Bundler will make sure that all the dependencies are aligned and that the project works properly.

If you want to learn more about why we need this tool, you can read [this article](https://bundler.io/guides/rationale.html#bundlers-purpose-and-rationale).

### Xcode:
The easiest way to install Xcode is via the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 10 or newer.

### Command Line Tools:
You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

### CocoaPods:
[CocoaPods]([https://guides.cocoapods.org/using/getting-started.html](https://cocoapods.org/)) is one of the dependency management system available for iOS. It is built with Ruby and you can install it using the version of Ruby you configured with in the previous steps.

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

# Preparing the Android device:
You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

## Using a virtual device:
If you use Android Studio to open ./AwesomeProject/android, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:

Android Studio AVD Manager

If you have recently installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Tiramisu API Level 33 image.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

# Running your React Native application:
### Step 1: Start Metro
First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—Metro Docs

To start Metro, run `npx react-native` start inside your React Native project folder:

`npx react-native start`

`react-native start` starts Metro Bundler.

### Step 2: Start your application
Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

`npx react-native run-android`
 `npx react-native run-ios`

If everything is set up correctly, you should see your new app running in your Android emulator shortly.
