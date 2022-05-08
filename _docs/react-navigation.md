# react-navigation

react-navigation 6버전 사용합니다.

최대한 typescript 적용하여 개발할 때 편의성을 가져가고자 합니다.

사용하는 것은 그렇게 어렵지 않으나 typescript 적용이 처음에 조금 어색할 수 있습니다.

여기서는 typescript를 어떻게 사용했는지에 중점을 두려고 합니다.

[공식 문서](https://reactnavigation.org/docs/typescript/) 를 그대로 따라갔기에 공식 문서를 보고 적용하셔도 전혀 문제가 없습니다.

- [Naivgation type](#navigation-type)
- [Screen Props type](#screen-props-type)
- [useNavigation type](#use-navigation-type)

## Navigation type

navigation은 react의 router와 같은 개념이라고 봐도 무방합니다.

전체적으로 route를 설정한다면 navigation을 설정하는 것과 같습니다.

주로 Stack(or Native Stack), Tab, Drawer 등을 사용합니다.

Stack을 설정하고 type을 따로 설정해주시면 됩니다. 저는 편의를 위해(다른 파일에서도 사용되기에) 별도 types.ts 파일로 두고 설정하였습니다.(모아두는 편이 나중에 보기에도 편할 때가 있더라구요)

폴더 구조는 앞의 문서에서 참고하시면 됩니다.

`screen/types.ts`에 설정하여 적용하였습니다. 보통 navigate는 screen에서 대부분 작업하기에 여기에 경로를 두었습니다.

## Screen Props type

## useNavigation type
