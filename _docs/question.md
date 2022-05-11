# Question

## native-stack vs stack

> https://stackoverflow.com/a/69064284

react-navigation에서 native-stack과 stack의 차이가 무엇인지 궁금햇습니다.

위 스택오버플로우 답변을 보면

Native Stack은 안드로이드와 IOS의 native navigation 시스템을 사용한다고 합니다.
그냥 Stack은 실제 "navigate"를 하지 않고 navigation 처럼 보이도록 처리한다고 합니다.

react-navigation에서는 둘 간의 차이는 거의 없다고 하지만 실제로 성능이나 기능이 정확히 같진 않습니다.
그러나 Stack은 커스터마이징 할 수 있습니다. 화면 간 이동 시 transition을 커스터마이징 할 수 있습니다.

## Pressable vs TouchableOpacity

> https://stackoverflow.com/a/62810728

react-native 버튼 컴포넌트 역할을 하는 Pressable과 TouchableOpacity 차이가 궁금했습니다.

답변에서 보면 Pressable은 RN 0.63버전에 처음 공개된 컴포넌트입니다. 그 이전엔 TouchableOpacity를 가장 많이 썼습니다.

둘 다 기본적인 기능은 동일합니다.
그러나 Pressable이 좀 더 새로운 props를 가지고 있습니다:
가령 `HitRect`와 같은 것들입니다.

> Fingers are not the most precise instruments, and it is common for users to accidentally activate the wrong element or miss the activation area. To help, Pressable has an optional HitRect you can use to define how far a touch can register away from the the wrapped element. Presses can start anywhere within a HitRect.

Pressable은 TouchableOpacity처럼 내장된 drawback이 없습니다. 스타일로 지정해서 만들어줄 수 있습니다.

## mobx-react vs mobx-react-lite

mobx-react-lite는 필요한 것만 간추리고 react functional component를 위해 다시 만들어진 라이브러리입니다.
그에비해 mobx-react는 Provider, inject같은 더 이상 사용되지 않을 것으로 예상되는 기능을 가지고 있습니다.

가볍고 더 빠른 mobx-react-lite를 사용하세요

## mobx observer wrapped memo?

observer는 memo를 내장하고 있어서 memo로 다시 감쌀필요가 없습니다.

## react navigation pop vs goback

> https://stackoverflow.com/a/66138382

- pop: stack navigator에 특화된 기능입니다. navigator에 쌓인 스크린의 수 만큼 pop할 수 있습니다.
- goBack: pop에 비해 더 전형적입니다. 어떤 navigator에서나 사용할 수 있습니다.

두 개가 완전하게 동치되는 것은 아닙니다. 만약 stack navigator안에 tab navigator가 있다고 가정해봅시다. tab 스크린에서 만약 pop()을 호출한다면 stack navigator로 돌아가게 됩니다. 그러나 만약 goBack()을 호출한다면 이전 tab 스크린이 history에 존재한다면 이전 tab 스크린으로 돌아가게 됩니다.

대부분의 경우는 goBack()을 사용하면 문제 없습니다. 다만 특별한 케이스는 위의 기능을 이해하고 거기에 맞게 사용하면 될 것 같습니다.
