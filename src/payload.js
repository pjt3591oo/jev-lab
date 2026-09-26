export const questionTypes = ['noul', 'choice', 'score'];
export const presets = {
  noul: { type: 'noul', instructions: '고객이 구독 해지를 요청하고 있나요?' },
  choice: { type: 'choice', instructions: '이 고객 문의를 담당할 부서를 선택하세요.', criteria: { billing: '결제, 청구서, 환불', technical: '기술 오류와 장애', general: '일반적인 문의' } },
  score: { type: 'score', instructions: '이 문의의 긴급도를 평가하세요.', criteria: ['낮음: 일반 문의', '보통: 일부 불편', '높음: 핵심 기능 장애', '긴급: 전체 서비스 장애'] },
};
export const initialPayload = {
  model: 'jev-latest',
  state: { message: '결제가 중복되었어요. 오늘 안에 환불해 주세요.' },
  questions: { cancellation: presets.noul, department: presets.choice, urgency: presets.score },
};
export const formatJson = value => JSON.stringify(value, null, 2);
export const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
export function parseDocument(text, forRequest = false) {
  const data = JSON.parse(text);
  if (!isObject(data)) throw new Error('JSON 객체를 입력하세요.');
  if (typeof data.model !== 'string') throw new Error('model은 문자열이어야 합니다.');
  if (!Object.hasOwn(data, 'state')) throw new Error('state 필드가 필요합니다.');
  if (!isObject(data.questions)) throw new Error('questions는 객체여야 합니다.');
  for (const [name, question] of Object.entries(data.questions)) {
    if (!isObject(question) || !questionTypes.includes(question.type)) throw new Error(`${name}: Noul, Choice, Score 타입을 사용하세요.`);
  }
  if (forRequest) {
    if (!data.model.trim()) throw new Error('model을 입력하세요.');
    if (!Object.keys(data.questions).length) throw new Error('하나 이상의 질문을 추가하세요.');
    if (Object.keys(data.questions).some(name => !name.trim())) throw new Error('각 질문의 ID를 입력하세요.');
  }
  return data;
}
export function initialEditor() {
  const document = structuredClone(initialPayload);
  return { document, json: formatJson(document), error: '' };
}
export function editorReducer(state, action) {
  switch (action.type) {
    case 'ui': return { document: action.document, json: formatJson(action.document), error: '' };
    case 'json': {
      try { return { document: parseDocument(action.text), json: action.text, error: '' }; }
      catch (error) { return { ...state, json: action.text, error: `${error.message} 마지막으로 유효했던 UI 내용을 유지합니다.` }; }
    }
    case 'format': {
      try { const document = parseDocument(state.json); return { document, json: formatJson(document), error: '' }; }
      catch (error) { return { ...state, error: error.message }; }
    }
    case 'error': return { ...state, error: action.message };
    default: return state;
  }
}
export function renameKey(value, oldKey, newKey) {
  if (oldKey !== newKey && Object.hasOwn(value, newKey)) throw new Error('중복된 이름입니다.');
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key === oldKey ? newKey : key, item]));
}
export function uniqueKey(value, base) {
  let key = base, index = 1;
  while (Object.hasOwn(value, key)) key = `${base}_${index++}`;
  return key;
}
export function removeKey(value, key) {
  return Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
}
