# trouble shooting

## android: local api server 개발 시 연결 안되는 문제

> https://stackoverflow.com/a/43277765  
> https://revs.runtime-revolution.com/connecting-react-native-to-localhost-65e7ddf43d02

안드로이드 경우 localhost에 떠있는 server에 접근할 수 있도록 설정해야 합니다.
예를 들어 localhost:4000에 api server가 실행되고 있다면 아래와 같이 reverse proxy를 설정하거나 localhost 대신 real ip로 연결해야 합니다.

```bash
# android: if use 4000 api server port
adb reverse tcp:4000 tcp:4000
```

## package 명 변경하려면?(android, ios)

> https://romeoh.tistory.com/entry/React-Native-%ED%8C%A8%ED%82%A4%EC%A7%80%EB%AA%85-%EB%B2%88%EB%93%A4%EB%AA%85-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0-Package-Bundle-Android-iOS

RN init 시 default로 생성되는 package명을 원하는 package명으로 변경합니다.

## ios developer mode 안나타는 현상

https://github.com/facebook/react-native/issues/25246#issuecomment-672071332

ios 에뮬레이터 경우 developer mode가 실행이 되지 않아 찾다보니 위에 같은 글에서 실행방법을 찾았습니다.

저 같은 경우 에뮬레이터 키보드 설정 후에 `cmd + d`를 입력하면 developer modal이 나타납니다.

또는 Device 메뉴아래에 "Shake" 버튼을 누르면 developer modal이 나타납니다.

## snapPoints가 1개 일 경우 bottom-sheet modal backdrop이 안나타는 문제

snapPoints가 1개 일 경우 index 범위가 -1, 0 이기 떄문에 아래와 같이 처리해주어야 합니다.

props 중에 appearsOnIndex와 disappearsOnIndex 의 기본값이 1과 0 으로 되어있어서 이를 수정해주어야 합니다.

```js
<BottomSheetBackdrop
  {...props}
  appearsOnIndex={0}
  disappearsOnIndex={-1}
  pressBehavior="close"
/>
```
