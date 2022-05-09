# Set up

개발하기 위한 Setup을 합니다.

[build, deploy](#build-deploy)

[third-party library](#third-party-library)

1. [mobx](#1-mobx)
2. [fetch](#2-fetch)
3. [storage](#3-storage)
4. [style](#4-style)
5. [folder structure](#5-folder-structure)
6. [.env](#6-env)
7. [test](#7-test)
8. [i18n](#8-i18n)
9. [gesture](#9-gesture)
10. [git, webp](#10-gif-webp)
11. [bottom-sheet](#11-bottom-sheet)
12. [google-login](#12-google-login)
13. [error 관리](#13-error-관리)

## build, deploy

앱은 android, ios 각각 빌드되어야 하며 store에 배포되어야 합니다.

[android의 경우](https://reactnative.dev/docs/signed-apk-android) keystore를 통해 key generate하여 configuration해야 하며 빌드 테스트를 위해 `--variant=release` 옵션을 추가하여 `run-android` 스트립트를 호출하면 됩니다.
[ios의 경우](https://reactnative.dev/docs/publishing-to-app-store) `--scheme`을 이용해서 `run-ios` 스트립트를 호출하면 됩니다.

자세한 내용은 해당 링크와 아래 [.env](#6-env) 부분을 참고하세요.

## third-party library

- [package.json](../package.json) 참고

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

다만 개인적으로는 react와 잘 맞지 않는 부분이 많다고 느껴집니다.
function component와 그렇게 잘 맞다는 생각이 들지 않고, custom hook과 연계부분이 아쉽습니다.
개인적으로 custom hook에 비지니스 로직을 수행하는 경우가 많은데 mobx를 사용하다 보니 action에서 모든 걸 처리하려고 하는 것 같아서 조금 어색했습니다.(다만 이번이 제가 처음이고, 사용법을 전혀 몰라서 이런 느낌이 들 수 있습니다.)

### 2. fetch

> axios

많이 사용되는 라이브러리 중 하나인 axios를 사용하려고 합니다.
인터셉터를 통해 로그관리를 하려고 합니다.

### 3. storage

> [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

deprecated library를 받지 말고 꼭 위 라이브러리를 받도록 주의합니다.
(@react-native-comunity/async-storage는 deprecated 입니다.)

### 4. style

> StyleSheet + react-native-paper + radix-ui/colors

별도 CSS-IN-JS 라이브러리를 쓰지 않고 RN에서 제공하는 StyleSheet를 이용해 작업합니다.
design token을 만들고 global style을 정의해두고 쓰고 있습니다.

추가로 react-native-paper를 사용합니다. mui의 RN 버전인데,,, 마찬가지로 써야할 경우가 있어서 미리 익히는 차원에서 react-native-paper를 사용하려고 합니다.

color palette를 위해 radix-ui/colors를 사용합니다.

### shadow

안드로이드, IOS shadow 적용할 때 Web css와는 다릅니다.

RN shadow style 코드를 생성해주는 사이트를 이용합니다.

https://ethercreative.github.io/react-native-shadow-generator/

### 5. folder structure

> [delightful folder](https://www.seonest.net/posts/%EB%B2%88-Delightful-React-FileDirectory-Structure)

기본적인 룰은 위 사이트 내용과 동일합니다.
그 외 RN에 맞게 몇 개 추가되거나, 개발 편의성을 위해 추가된 폴더가 있습니다.

```bash
src
├── api
├── assets
├── components
├── constants
├── contexts
├── hooks
├── i18n
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
ios의 경우 `cd ios; pod install` or `npx pod-install` 하면 일단 package import는 완료됩니다.

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

### 13. error 관리

Error를 상속받는 AppError를 만들어서 에러처리를 하려고 합니다.

일단 가장 많이 발생할 것으로 예상되는 루트가 api 처리하는 루트인데 일반적인 경로는 다음과 같습니다.

1. `screen(or component)`에서 store action 호출
2. `store action`에서 api function 호출
3. `api function`에서 axios 실행 후 성공응답 or 에러응답

만약 axios 실행이 success 라면 호출한 반대 순서로 정상 return 됩니다.  
일단 비지니스 로직을 가진 store action에서 에러관리를 하기위해 집중할 것입니다.

만약 axios 실행이 error 라면 다음과 같이 처리합니다.
a. `api function`에서 try/catch없이 그대로 throw 됩니다.
b. `store action`에서 catch문을 통해 Error를 AppError로 감싸서 throw AppError;
c. `screen(or component)`에서 catch문을 통해 AppError를 무시할지 snackbar를 호출할지 navigate할지 또 다른 비지니스 로직을 호출할지를 결정합니다.

기본적인 룰은 위와 같으나 사각에서 발생한 에러를 잡기 위해 추후에 global Error boundary를 추가해서 처리할 생각입니다.

### 14. biometric-auth

> face id, touch id

> https://stackoverflow.com/a/64929151

안드로이드(touch id), iOS(face id)에서 사용할 생체인증을 지원해보려고 합니다.

expo-local-authentication 라이브러리를 이용합니다.

다만 RN에서 사용하기 위해서는 expo로 migration이 필요합니다.

1. react-native-unimodules
2. expo migration

1번인 expo에서 제공하는 라이브러리로 RN에서 문제없이 expo 라이브러리를 사용할 수 있게 해줍니다. 그러나 deprecated되었기 때문에 사용하지 않습니다.(아직까지 npm trend에는 10,000 정도의 다운로드 수가 있었...)

2번인 expo로 migration하는 것으로 방향을 잡았습니다.

> https://dev.to/wbroek/migrate-from-react-native-unimodules-to-expo-modules-25c6

위 글을 참고삼아 expo로 migration하는 것을 진행합니다.
(공식 문서에서는 냅다 expo로 설치해버렷! 듯한 느낌이어서 겁먹었었는데 설정도 자동으로 해주고 간단하게 적용가능합니다, 다만 iOS는 12버전부터 적용된다던지 등등이 있긴 한데 그 아래 버전은 저도 아직...잘 모르겠습니다.)

> https://github.com/expo/expo/tree/main/packages/expo-local-authentication#installation-in-bare-react-native-projects

expo-local-authentication을 설치, 설정합니다.

validation, authenticate를 포함해서 총 4개 정도 method를 제공합니다.
사용법은 어려움은 거의 없기 때문에 설정만 잘 한다면 무리없이 사용할 수 있습니다.

만약 에뮬레이터를 사용하시면 안드로이드/iOS 지문설정, 페이스아이디 설정 등 필요할 수 있는데 구글링 하시면 금방 설정 할 수 있습니다.

다만 처음 생체 인증을 사용하기에 어떤식으로 validation을 처리할지 고민이 됩니다.

1. 사용가능한 생체 인증 방식이 없을 경우
2. 사용가능한 생체 인증 방식이 있지만, 등록된 생체 인증이 없을 경우
3. 생체 인증을 등록했지만, 생체 인증에 실패했을 경우
4. 생체 인증에 실패했지만 비밀번호입력을 통해 인증을 성공한 경우(이 경우도 생체인증을 성공했다고 봐야하는건가?)

등등 케이스가 여러개 있으므로 적절하게 플로우를 만들어서 적용하는게 사용자 경험에 좋을 것 같다는 생각이 듭니다.
