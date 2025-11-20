# React Native / Expo Application (Structured & Scalable Architecture)

This project is built using **Expo** and organized with a clean and scalable **SRC-based architecture**.  
The default `app/` directory used by Expo Router remains **untouched**, and the project can be developed entirely from `src/`.

---

## 🧱 Project Goals

- Maintain **clean folder separation**
- Support **long-term scalable development**
- Keep onboarding **easy for new developers**
- Allow optional usage of **Expo Router** or **React Navigation**

---

## Test Cases

C:\Users\NAVEEN\Desktop\ReactNative\my-appk\.github\workflows\ci.yml

## 🚀 Tech Stack

| Category        | Technology                                                 |
| --------------- | ---------------------------------------------------------- |
| Framework       | Expo + React Native                                        |
| Language        | TypeScript                                                 |
| Package Manager | **pnpm** (recommended)                                     |
| Navigation      | React Navigation                                           |
| API Client      | Fetch / Axios (client wrapper in `services/api/client.ts`) |
| Storage         | AsyncStorage / MMKV (wrapper in `services/storage.ts`)     |
| Testing         | Jest + React Testing Library                               |

---

## 📦 Installation

```bash
pnpm install
pnpm expo start

pnpm add react-native-paper
pnpm add react-native-safe-area-context
pnpm add @react-navigation/native @react-navigation/native-stack
pnpm add react-native-toast-message

---

## 🧱 Git
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.
git remote set-url origin https://github.com/navi4347/ReactNative_myapp.git
git status
git branch
git push --set-upstream origin master
git push

## Folder Stcture  tree /f
C:.
│   .env
│   .env.example
│   .gitignore
│   app.json
│   declarations.d.ts
│   eslint.config.js
│   expo-env.d.ts
│   folderstructure.js
│   package.json
│   pnpm-lock.yaml
│   README.md
│   tsconfig.json
│
├───.expo
│   │   devices.json
│   │   README.md
│   │   settings.json
│   │
│   ├───types
│   │       router.d.ts
│   │
│   └───web
│       └───cache
│           └───production
│               └───images
│                   └───favicon
│                       └───favicon-a4e030697a7571b3e95d31860e4da55d2f98e5e861e2b55e414f45a8556828ba-contain-transparent
│                               favicon-48.png
│
├───.github
│   └───workflows
│           ci.yml
│
├───.vscode
│   │   extensions.json
│   │   settings.json
│   │
│   └───.react
├───app
│       index.tsx
│       _layout.tsx
│
├───assets
│   ├───fonts
│   └───images
│           android-icon-background.png
│           android-icon-foreground.png
│           android-icon-monochrome.png
│           favicon.png
│           icon.png
│           partial-react-logo.png
│           react-logo.png
│           react-logo@2x.png
│           react-logo@3x.png
│           splash-icon.png
│
├───scripts
│       reset-project.js
│
├───src
│   │   App.tsx
│   │   index.tsx
│   │
│   ├───assets
│   │   ├───fonts
│   │   │       magneto.ttf
│   │   │
│   │   ├───images
│   │   │       logo.png
│   │   │
│   │   ├───json
│   │   │       sample-data.json
│   │   │
│   │   └───loaders
│   │           spinner.json
│   │
│   ├───components
│   │   ├───shared
│   │   │       Button.tsx
│   │   │       Header.tsx
│   │   │       Icon.tsx
│   │   │       index.ts
│   │   │       InlineMessage.tsx
│   │   │       Loader.tsx
│   │   │       RowLink.tsx
│   │   │
│   │   └───ui
│   ├───constants
│   │       index.ts
│   │
│   ├───hooks
│   │       useAuth.ts
│   │       useFetch.ts
│   │
│   ├───navigation
│   │       AppNavigator.tsx
│   │       AuthStackNavigator.tsx
│   │       MainTabNavigator.tsx
│   │
│   ├───pages
│   │       AboutPage.tsx
│   │       ProfilePage.tsx
│   │       SettingsPage.tsx
│   │
│   ├───screens
│   │   │   ForgotPasswordScreen.tsx
│   │   │   LoginScreen.tsx
│   │   │   NotFoundScreen.tsx
│   │   │   SignUpScreen.tsx
│   │   │   SplashScreen.tsx
│   │   │
│   │   ├───Dashboard
│   │   │       DashboardScreen.tsx
│   │   │
│   │   └───Home
│   │           HomeScreen.tsx
│   │
│   ├───services
│   │   │   storage.ts
│   │   │
│   │   └───api
│   │           auth.ts
│   │           client.ts
│   │
│   ├───store
│   │       index.ts
│   │
│   ├───theme
│   │       colors.ts
│   │       spacing.ts
│   │       typography.ts
│   │
│   ├───types
│   │       index.d.ts
│   │
│   └───utils
│           fonts.ts
│           format.ts
│
└───tests
    │   setupTests.ts
    │
    └───__tests__
        │   App.test.tsx
        │
        └───components
                Button.test.tsx
```
