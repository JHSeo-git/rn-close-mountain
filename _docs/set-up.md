# Set up

개발하기 위한 Setup을 합니다.

- [build, deploy](#build-deploy)
- [third-party library](#third-party-library)

## build, deploy

앱은 android, ios 각각 빌드되어야 하며 store에 배포되어야 합니다.

[android의 경우](https://reactnative.dev/docs/signed-apk-android) keystore를 통해 key generate하여 configuration해야 하며 빌드 테스트를 위해 `--variant=release` 옵션을 추가하여 `run-android` 스트립트를 호출하면 됩니다.
[ios의 경우](https://reactnative.dev/docs/publishing-to-app-store) `--configuration Release` 옵션을 추가하여 `run-ios` 스트립트를 호출하면 됩니다.

자세한 내용은 해당 링크를 참조하세요.

## shadow

안드로이드, IOS shadow 적용할 때 Web css와는 다릅니다.

RN shadow style 코드를 생성해주는 사이트를 이용합니다.

https://ethercreative.github.io/react-native-shadow-generator/

## third-party library

```bash
yarn add mobx mobx-react \
  axios \
  react-native-config \
  react-native-svg \
  @react-native-async-storage/async-storage \
  @react-navigation/bottom-tabs \
  @react-navigation/drawer \
  @react-navigation/native \
  @react-navigation/native-stack \
  react-native-get-random-values uuid \
  react-native-safe-area-context \
  react-native-screens \
  @gorhom/bottom-sheet \
  react-native-reanimated react-native-gesture-handler \
  i18next react-i18next \
  mobx mobx-react \

yarn add -D @types/uuid react-native-svg-transformer
```

설치 후 Native에서 잘 동작하도록 안드로이드 설정, IOS 설정을 해야합니다.

각 라이브러리 공식 문서를 참고하여 설정하도록 합시다.

- auto link (android, ios)
- `npx pod-install` (ios)
- `npx react-native link` (android, ios)
- manual link (android, ios)

### 1. mobx

> store

mobx 써야할 경우가 있어서 이번에 한 번 사용해보려고 합니다.

> 전체적인 구조는 아래 블로그 글과 거의 흡사합니다.  
> https://dev.to/cakasuma/using-mobx-hooks-with-multiple-stores-in-react-3dk4

### 2. fetch

> axios

### 3. storage

> [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

deprecated library를 받지 말고 꼭 위 라이브러리를 받도록 주의합니다.
(@react-native-comunity/async-storage는 deprecated 입니다.)

### 4. style

> StyleSheet

별도 CSS-IN-JS 라이브러리를 쓰지 않고 RN에서 제공하는 StyleSheet를 이용해 작업합니다.
design token을 만들고 global style을 정의해두고 쓰고 있습니다.

### 5. folder structure

> [delightful folder](https://www.seonest.net/posts/%EB%B2%88-Delightful-React-FileDirectory-Structure)

기본적인 룰은 위 사이트 내용과 동일합니다.
그 외 RN에 맞게 몇 개 추가되거나, 개발 편의성을 위해 추가된 폴더가 있습니다.

```bash
src
├── assets
├── components
├── constants
├── contexts
├── hooks
├── i18n
├── navigation
├── screens
├── stores
└── utils
```

### 6. .env

> react-native-config

- https://github.com/luggit/react-native-config#different-environments
- https://velog.io/@heumheum2/React-Native-Multiple-Environments

처음인 경우 조금 까다롭습니다.
android의 경우 autolink나 manuallink를 진행하고
ios의 경우 `cd ios; pod install` 하면 일단 package import는 완료됩니다.

추가로 local, dev, stage ... 등 env 파일을 나눠서 사용하는 경우
android의 경우 app/build.gradle에 위 문서에서 안내한대로 코드를 추가하고
ios의 경우도 마찬가지로 configuration 추가해줘야합니다.

적용과 동작방법은 package.json의 script 부분을 확인하면 됩니다.
(안드로이드는 --variant를 통해, ios는 --scheme을 통해 env를 설정합니다.)

### 7. test

> jest

### 8. i18n

> https://github.com/i18next/react-i18next/tree/master/example

github example 코드를 참고하면서 설정합니다.

타입 설정, rn 적용
(namespace는 설정하지 않았습니다)

src/i18n 폴더 참고하시면 됩니다.

앱 storage 이용해 i18n 언어 설정을 저장합니다.
context를 이용해 초기화와 설정 부분을 추가합니다.

### 9. gesture

> [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler)

native gesture를 RN에서 자동으로 쓸 수 있게 해주는 library 입니다.

navigation을 쓴다면 따로 Native 설정할 필요 없이 자동으로 화면 전환에 적용됩니다.

### 10. gif, webp, ...

> https://reactnative.dev/docs/image#gif-and-webp-support-on-android

안드로이드에서는 기본적으로 gif, webp 등 영상 format을 제공하지 않습니다.
공식 Document 참고하여 library를 추가합니다.

react-navigation을 사용한다면 별도로 android 프로젝트에 코드를 추가하지 않아도 됩니다.

### 11. bottom-sheet

> https://gorhom.github.io/react-native-bottom-sheet/

react-native-reanimated와 react-native-gesture-handler를 의존성으로 가지기에 같이 설치해야 합니다.

마찬가지로 android, ios 설정이 필요함으로 공식 문서에서 참고하도록 합니다.

### 12. google login

react-native에서 google login을 사용하기 위해 [react-native-google-signin](https://github.com/react-native-google-signin)을 사용합니다.
안드로이드와 IOS 둘 다 설정해줘야 하니 공식 문서를 잘 따라가면서 설정해야 합니다.

#### 라이브러리 등록

- 안드로이드는 autolink를 사용하기 때문에 별도 설정할 필요가 없습니다.
- IOS는 `pod install` 사용하면 자동으로 Podfile이 설치됩니다.

#### Google Client ID and credentials.plist(or credentials.json) 발급

안드로이드와 IOS 둘 다 각각 발급해서 적용해야 합니다.

- IOS: package명 만 입력하면 발급받을 수 있습니다.
- ANDROID: 안드로이드는 조금 까다로운데 keystore에 있는 SHA1 값이 필요합니다. android/app/debug.keystore의 SHA1 값을 일단 등록해서 사용할 것입니다.(production.keystore는 또 따로 등록해야되는건지...그건 잘 모르겠네...)([여기서 확인](https://developers.google.com/android/guides/client-auth))

```bash
# android
# debug.keystore 초기 비밀번호는 android 입니다.
keytool -list -v -keystore android/app/debug.keystore
```
