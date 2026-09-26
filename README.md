# Jev Lab (React)

React 19 + Vite로 만든 Jev System One API 테스트 페이지입니다.

[데모](https://pjt3591oo.github.io/jev-lab/jev-lab.html)

## 실행

Node.js 20.19+ 또는 22.12+가 필요합니다.

```sh
npm ci
npm run dev
```

터미널에 표시되는 로컬 주소를 여세요. 기본 요청 대상은 `http://localhost:8000/v1/systemone`이며 화면에서 변경할 수 있습니다.

```sh
npm test
npm run build
npm run preview
```

빌드 결과는 `dist/`에 생성됩니다. `dist/jev-lab.html`은 React 코드와 스타일을 포함한 단독 실행용 파일입니다.

## 기능

- State의 중첩 객체, 배열, 문자열, 숫자, 불리언, null 편집
- 여러 Noul/Choice/Score 질문 혼합, 추가, 삭제
- UI와 JSON 즉시 양방향 동기화
- JSON 입력 중 오류가 있으면 마지막 유효 UI 상태 유지
- 실제 POST 요청, Bearer 토큰, 원본 응답, HTTP 상태 및 소요 시간

## 구조

- `src/App.jsx`: 서버 설정과 요청 처리
- `src/components/PayloadEditor.jsx`: UI/JSON 모드와 질문 목록
- `src/components/ValueEditor.jsx`: 재귀 데이터 편집기
- `src/components/QuestionCard.jsx`: 질문 타입과 기준
- `src/components/ResponsePanel.jsx`: 응답 표시
- `src/payload.js`: 페이로드 모델과 동기화 reducer
- `src/styles.css`: 반응형 스타일

토큰은 메모리에만 유지되며 저장하지 않습니다. 브라우저에서 Jev 서버로 직접 요청하므로 서버의 CORS 허용이 필요합니다. HTTPS 페이지에서 HTTP 서버 요청이 차단되면 로컬 개발 서버 또는 적절한 HTTPS 엔드포인트를 사용하세요.
