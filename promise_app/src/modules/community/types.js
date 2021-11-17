/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const types = {
    CREATE_COMMUNITY_LIST : 'CREATE_COMMUNITY_LIST',
    CHANGE_POST_DETAIL: 'CHANGE_POST_DETAIL',
    RESET_POST_DETAIL: 'RESET_POST_DETAIL',
    RESET_COMMUNITY_LIST : 'RESET_COMMUNITY_LIST',
    GET_COMMUNITY: 'GET_COMMUNITY',
    GET_POST_DETAIL: 'GET_POST_DETAIL',
};

export default types