# Roles & Permissions

> https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#concept

strapi 플러그인 중 하나로 사용자 권한 관리를 하는 것이 있습니다.

이 플러그인을 사용하면 왠만한 사용자 권한 관리는 다 할 수 있어서 이걸 쓰도록 합니다.

JWT 기반으로 동작하고 사용자 그룹 간의 권한을 관리할 수 있는 ACL 전략도 함께 제공됩니다.

> ACL(Access Control List) 전략  
> 엑세스 제어 목록은 개체나 개체 속성에 적용되어 있는 허가 목록을 말합니다. 이 목록은 누가 또는 무엇이 객체 접근 허가를 받는지, 어떠한 작업이 객체에 수행되도록 허가를 받을지를 지정하고 있습니다. 이를테면 XYZ 파일에 대한 ACL(Alice, delete)이 있다면 Alice에게 XYZ 파일을 삭제할 허가 권한을 제공한다는 것을 의미합니다.
>
> [ACL](https://ko.wikipedia.org/wiki/%EC%A0%91%EA%B7%BC_%EC%A0%9C%EC%96%B4*%EB%AA%A9%EB%A1%9D)

## 개념

이 플러그인을 설치, 설정하면 애플리케이션에 access layer가 추가됩니다. JWT를 사용하여 사용자를 인증합니다.

API 요청이 전송될 때마다 서버는 헤더에 `Authorization` 헤더가 있는지 확인하고 요청한 사용자가 있다면 해당 리소스에 접근 가능한지 확인합니다.

이를 위해 JWT는 사용자 ID가 포함되어 있으며 이를 이용해 사용자가 속한 그룹을 찾을 수 있습니다. 그리하여 그룹이 해당 route에 접근이 허용되는지 안되는지 알 수 있습니다.

## Role and Permission 관리

- Public role:
  이 role은 헤더에 `Authroization`이 없는 요청이 왔을 때 사용됩니다. 만약 이 role에 몇 가지 permission을 부여한다면, 모든 사람들이 허용된 endpoint에 접근할 수 있다는 것을 의미합니다. 이는 front-end 애플리케이션이 사용자 인증과 권한을 개발하는 것 없이 모든 컨텐츠에 접근하도록 하는 경우 `find` / `findOne` endpoint를 선택하는 일반적인 방법입니다.
- Authenticated role
  모든 신규 사용자에게 부여되는 기본 role입니다. 이 role에 사용자가 접근할 수 있는 route를 설정할 수 있습니다.

## Authentication

### 토큰 사용

권한이 제한된 API 요청에 JWT 토큰을 사용할 수 있습니다. 사용자로써 API를 요청하기 위해 JWT 토큰을 `Authorization` GET 요청 헤더에 추가합니다. 토큰이 없는 요청은 기본적으로 `Public role`로 가정합니다. 인증 실패는 401 오류를 반환합니다.

```js
import axios from 'axios';

const token = 'YOUR_TOKEN_HERE';

// Request API.
axios
  .get('http://localhost:1337/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    // Handle success.
    console.log('Data: ', response.data);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

### JWT 구성

config file(`./config/plugins.js`)에서 JWT 생성을 구성할 수 있습니다.

strapi는 jsonwebtoken 라이브러리를 이용하여 JWT를 생성합니다.

option은 다음과 같습니다.

- `jwtSecret`: 랜덤한 string 값으로 보통 .env에 `JWT_SECRET`로 설정하여 사용합니다.
- `jwt.expiresIn`: 만료 시간을 설정합니다. 단위를 적지 않으면 밀리세컨드(ms)로 간주합니다. "45m", "10d", "2 days", "7d", "2y" 등으로 설정가능합니다. "120"은 "120ms"와 동일합니다.

> 보안 문제로 JWT 만료를 30일 이상으로 설정하는 것을 절대 권장하지 않습니다.

```js
// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  'users-permissions': {
    config: {
      jwtSecret: process.env.JWT_SECRET,
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  // ...
});
```

## register

```js
import axios from 'axios';

// Request API.
// Add your own code here to customize or restrict how the public can register new users.
axios
  .post('http://localhost:1337/api/auth/local/register', {
    username: 'Strapi user',
    email: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

## login

로그인에 성공하면 response에는 JWT 인증 토큰과 함께 사용자 정보가 포함됩니다.

- `ientifier`는 "이메일" 또는 "사용자 이름"이 될 수 있습니다.

```js
import axios from 'axios';

// Request API.
axios
  .post('http://localhost:1337/api/auth/local', {
    identifier: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

## provider

> strapi는 웹을 기반으로 제공하기에 react native에서 provider 기능을 사용하기엔 적절하지 않습니다.

OAuth, OAuth2 provider를 통해 쉽게 로그인, 가입을 진행하여 인증을 할 수 있습니다.

### 로그인 흐름

아래와 같이 있다고 가정해 보겠습니다.

- backend: strapi.website.com
- fronend: website.com

1. 사용자가 프론트엔드 웹(`https://website.com`)으로 이동하여 `connect with Github`버튼을 클릭합니다.
2. 프론트엔드는 백엔드 URL로 리다이렉트(링크) 합니다.(`https://strapi.website.com/api/connect/github`)
3. 백엔드는 Github 로그인 페이지(`https://github.com/login....)로 리다이렉션 합니다.
4. 로그인이 완료되면 Github은 백엔드로 `code` 쿼리 파라미터를 가진 URL로 리다이렉트 합니다. URL: `https://strapi.website.com/api/connect/github/callback?code=abcdef`
5. 백엔드는 해당 `code`를 사용하여 Github으로부터 `access_token`를 얻습니다.
6. 그리고 백엔드는 `access_token`를 쿼리 파라미터에 담아서 미리 정한 url로 리다이렉트 합니다. (ex: `http://website.com/connect/github/redirect?access_token=eyfvg`)
7. 프론트엔드(`http://website.com/connect/github/redirect`)는 백엔드(`https://strapi.website.com/api/auth/github/callback?access_token=eyfvg`)를 호출합니다. 그리고 백엔드는 JWT와 함께 strapi user 정보를 반환합니다.
   (더 자세히, 백엔드는 Github에 사용자 정보를 요청합니다. 그리고 Github의 사용자 이메일과 strapi 사용자 이메일을 비교합니다.)
8. 이제 프론트엔드는 사용자의 `JWT`를 가집니다. 이것은 사용자가 연결되었고 인증이 필요한 요청을 할 수 있다는 것을 의미합니다.

> redirect Response
> 응답코드를 302로 지정한 후 헤더에 "Location: REDIRECT_URL" 을 추가해주면 됩니다.
>
> [예시 HTTP Response]  
> HTTP/1.1 302 Message for 302  
> Location: /main
>
> 위 HTTP 응답을 받은 브라우저는 알아서 REDIRECT_URL로 요청을 날립니다.
> 웹 브라우저는 3xx 응답 결과에 Location header가 있으면 그 위치로 자동으로 이동합니다.
