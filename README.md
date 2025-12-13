# template_client_React-Native

Universal project template that combines React Web and React Native in a single codebase. This project allows you to develop applications that work simultaneously as web applications and as native mobile applications for Android and iOS.

## 🎯 Key Features

- **Single codebase** for web and mobile platforms
- **Shared code** for components, services, and business logic with minimal differences
- **Platform-specific adapters** for navigation, storage, and other system functions
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Theme and localization support**
- **Optimized build** with code splitting for web version
- **Hot Reload / Fast Refresh** for rapid development

## 📋 Requirements

- **Node.js** >= 20
- **npm** or **yarn**
- For Android development:
  - Android Studio
  - Android SDK
  - AVD (Android Virtual Device) or physical device
- For iOS development (macOS only):
  - Xcode
  - CocoaPods

## 🚀 Quick Start

### 1. Create New Project

Navigate to the folder where you want to create the project (do not create the project folder yourself) and run:

```bash
npx @react-native-community/cli init <project_name> --version 0.82.1
```

**⚠️ WARNING!** Use a shorter project path to avoid Windows' 260-character limit, which can break tools like CMake and Ninja during builds.

### 2. Check Environment

```bash
npx react-native doctor
```

### 3. Initial Run (Android)

```bash
npx react-native run-android
```

Make sure the project runs without errors.

### 4. Install Template

Copy all files from the `template/` folder to the project root, replacing existing files.

Remove the following files from the project:
- `App.tsx`
- `babel.config.js`
- `jest.config.js`
- `tsconfig.json`
- `index.js`

### 5. Install Dependencies

```bash
npm install
```

### 6. Run Project

#### Web Version (Development)

For the first run in development mode, build first:
```bash
_web_build_dev.bat
```

Then start the dev server:
```bash
_web_start_dev.bat
```

Or use npm scripts:
```bash
npm run web:build:dev
npm run web:start:dev
```

The application will be available at `http://localhost:12345` (or at the port specified in the `DEV_PORT` environment variable).

#### Android (Development)

```bash
_mobile_android_start_dev.bat
```

Or:
```bash
npm run mobile:android:start:dev
```

#### iOS (Development, macOS only)

```bash
npm run mobile:ios:start:dev
```

## 📁 Project Structure

```
template/
├── client/                          # Main application code
│   ├── app/                         # Entry points and navigation
│   │   ├── mobile_App.tsx          # Mobile application initialization
│   │   ├── mobile_Init.tsx         # Mobile application setup
│   │   ├── mobile_Navigation.tsx   # Navigation for React Navigation
│   │   ├── web_App.tsx             # Web application initialization
│   │   ├── web_Init.tsx            # Web application setup
│   │   └── web_Navigation.tsx      # Navigation for React Router
│   │
│   ├── core/                        # Application core
│   │   ├── services/               # Services and utilities
│   │   │   ├── auth/               # Authentication services
│   │   │   ├── connection/         # HTTP requests
│   │   │   ├── hooks/              # Platform-specific hooks
│   │   │   │   ├── navigationAdapter.native.ts  # Navigation adapter for RN
│   │   │   │   ├── navigationAdapter.web.ts     # Navigation adapter for web
│   │   │   │   ├── storageAdapter.native.ts     # Storage adapter for RN
│   │   │   │   └── storageAdapter.web.ts        # Storage adapter for web
│   │   │   ├── providers/          # React Context providers
│   │   │   │   ├── superProviderService.tsx     # Main provider
│   │   │   │   ├── storageProvider.tsx          # Storage provider
│   │   │   │   ├── styleProvider.tsx            # Style provider
│   │   │   │   ├── languageProviderService.tsx  # Localization provider
│   │   │   │   └── ...
│   │   │   └── storage/            # Storage abstraction
│   │   │
│   │   ├── types/                  # TypeScript types
│   │   ├── ui/                     # UI components and resources
│   │   │   ├── components/         # Reusable components
│   │   │   ├── locales/            # Localization files
│   │   │   ├── styles/             # Styles and themes
│   │   │   └── assets/             # Images, HTML templates
│   │   └── utils/                  # Utilities
│   │
│   └── modules/                     # Application modules
│       ├── main/                   # Example module
│       │   ├── components/         # Module components
│       │   ├── hooks/              # Module hooks
│       │   ├── routes.ts           # Module routes
│       │   ├── screens/            # Module screens
│       │   ├── store/              # Redux slice for module
│       │   └── types/              # Module types
│       └── routes.ts               # Main routes file
│
├── index.android.js                # Entry point for Android/iOS
├── index.web.ts                    # Entry point for web
├── package.json                    # Dependencies and scripts
├── webpack.config.js               # Webpack configuration for web
├── metro.config.js                 # Metro configuration for mobile
├── babel.config.cjs                # Babel configuration
├── tsconfig.base.json              # Base TypeScript config
├── tsconfig.native.json            # TypeScript config for mobile
└── tsconfig.web.json               # TypeScript config for web
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root to configure environment variables:

```env
DEV_PORT=12345
NODE_ENV=development
```

### TypeScript Paths

The project has configured aliases for convenient imports:

- `@client/*` → `client/*`
- `@client/core/*` → `client/core/*`
- `@client/services/*` → `client/core/services/*`
- `@client/ui/*` → `client/core/ui/*`
- `@client/modules/*` → `client/modules/*`
- `@client/app/*` → `client/app/*`
- `@types/*` → `client/core/types/*`

### Platform-Specific Code

The project uses file extensions for platform-specific code:

- `.native.ts` / `.native.tsx` - code only for React Native
- `.web.ts` / `.web.tsx` - code only for web
- `.ts` / `.tsx` - shared code for all platforms

## 📦 Available Scripts

### Web Version

```bash
npm run web:start:dev    # Start dev server
npm run web:build:dev    # Build for development
npm run web:build:prod   # Production build
```

### Mobile Version

```bash
npm run mobile:android:start:dev  # Run on Android
npm run mobile:ios:start:dev      # Run on iOS (macOS)
npm start                         # Start Metro bundler
```

### Others

```bash
npm test          # Run tests
npm run lint      # Lint code
```

## 🏗️ Architecture

### How It Works

1. **Shared Code**: Most of the logic, components, and services are written once and used across all platforms.

2. **Platform Adapters**: For features that differ between platforms (navigation, storage, back button handling), adapters are used that provide a unified API.

3. **Separate Entry Points**: 
   - `index.android.js` → loads `mobile_App.tsx` for React Native
   - `index.web.ts` → loads `web_App.tsx` for web

4. **Separate Navigation Systems**:
   - React Navigation (for mobile platforms)
   - React Router (for web)

### Key Components

- **SuperProvider** - main provider that combines all application contexts
- **Navigation Adapters** - unify navigation API across platforms
- **Storage Adapters** - abstract work with AsyncStorage (RN) and localStorage (Web)
- **Providers** - manage theme, localization, system data

## 🎨 Styling

The project uses React Native StyleSheet API, which works on both mobile platforms and web (thanks to `react-native-web`). All styles are located in `client/core/ui/styles/`.

## 🌍 Localization

Localization files are located in `client/core/ui/locales/`. Language packs are loaded through `languageProviderService`.

## 📱 Building for Production

### Web

```bash
npm run web:build:prod
```

Built files will be in the `public/` folder.

### Android

```bash
_mobile_android_build_prod.bat
```

Or build APK/AAB through Android Studio.

## 🐛 Debugging

- **Web**: Use browser DevTools and source maps
- **React Native**: Use React Native Debugger or Flipper
- **Metro**: Metro bundler logs will help diagnose build issues

## 📚 Technologies Used

- **React** 19.1.1
- **React Native** 0.82.1
- **React Native Web** 0.21.2
- **TypeScript** 5.9.3
- **Redux Toolkit** 2.11.0
- **React Navigation** 7.x
- **React Router** 7.9.6
- **Webpack** 5.103.0
- **Metro** 0.82.1

## 🤝 Contributing

When developing new features:

1. Write code that works on all platforms where possible
2. Use platform extensions (`.native.ts`, `.web.ts`) only when necessary
3. Test changes on both platforms
4. Follow the project structure and use path aliases


## � Android APK/AAB Size Optimization

The project includes optimizations to reduce Android release build sizes by 40-60% through ProGuard/R8 minification, resource shrinking, and APK splits.

### Already Configured

The following optimizations are already set up in `android/app/build.gradle`:

1. **ProGuard/R8 Minification** - Code shrinking and obfuscation
2. **Resource Shrinking** - Removes unused resources
3. **APK Splits** - Separate APK per architecture (only for `assembleRelease`)
4. **Hermes Engine** - Enabled by default in `android/gradle.properties`

### Build Commands

#### APK Build (with splits)
Generates separate APK files for each architecture:

```bash
cd android
gradlew clean assembleRelease
```

Output location: `android/app/build/outputs/apk/release/`
- `app-arm64-v8a-release.apk` (modern devices)
- `app-armeabi-v7a-release.apk` (older devices)
- `app-x86-release.apk` (emulators)
- `app-x86_64-release.apk` (emulators)

#### AAB Build (for Google Play)
Generates a single Android App Bundle:

```bash
cd android
gradlew clean bundleRelease
```

Output location: `android/app/build/outputs/bundle/release/app-release.aab`

> **Note**: APK splits are automatically disabled for AAB builds as Google Play handles per-device optimization.

### Manual Setup (if not configured)

If you need to set up these optimizations manually:

#### 1. Edit `android/app/build.gradle`

Add ProGuard configuration in `buildTypes.release`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
    }
}
```

Add APK splits (between `defaultConfig` and `signingConfigs`):

```gradle
splits {
    abi {
        reset()
        // Only enable for assembleRelease, disable for bundleRelease
        enable !gradle.startParameter.taskNames.any { it.contains("bundle") }
        universalApk false
        include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
    }
}
```

Disable unused build features:

```gradle
buildFeatures {
    buildConfig = false
}
```

#### 2. Configure `android/app/proguard-rules.pro`

Add React Native and library-specific ProGuard rules (see file for complete configuration).

#### 3. Verify Hermes is enabled

Check `android/gradle.properties`:

```properties
hermesEnabled=true
```

### Expected Results

- **APK Size Reduction**: 40-60% smaller than non-optimized builds
- **Separate APKs**: Each architecture-specific APK is smaller than a universal APK
- **AAB Benefits**: Google Play automatically delivers optimized APKs to users

### Testing Optimized Builds

1. Install architecture-specific APK on a device:
   ```bash
   adb install android/app/build/outputs/apk/release/app-arm64-v8a-release.apk
   ```

2. Verify all app features work correctly after ProGuard optimization

3. Compare file sizes before and after optimization



## 📝 License

This template is provided as-is for use in your projects.

---

**Happy coding! 🚀**
