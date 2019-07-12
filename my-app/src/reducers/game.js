const initialState = {
	gameConfigData: {},
	currentIssues: '',
	issues: '',
	issueCode: 0,
	trendIssueCode: 0,
	lastNumberData: {},
	betAwardData: {},
	gameStatus: {},
	historyList: [],
	rankList: {},
	animationStatus: '',
	loading: true,
	playResult: {
		currentIssues: '',
		lastIssues:'',
		height: 0,
		time: 0
	}
};

const game = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ISSUES':
			return {
				...state,
				'issues': action.issues
			};
		case 'SET_PLAYRESULT':
			return {
				...state,
				'playResult': action.playResult
			};
		case 'SET_GAMECONFIG':
			return {
				...state,
				'gameConfigData': {
					...state.gameConfigData,
					userNickName: action.gameConfigData.userNickName
				}
			};
		case 'SET_HISTORY_LIST':
			return {
				...state,
				'historyList': action.historyList
			};
		case 'SET_RANK_LIST':
			return {
				...state,
				'rankList': action.rankList
			};
		case 'SET_LAST_NUMBER':
			return {
				...state,
				'lastNumberData': action.lastNumberData,
				'issues': action.lastNumberData.lastnumber,
				'issueCode': action.lastNumberData.issueCode,
				'currentIssues': action.lastNumberData.number
			};
		case 'SET_BETAWARD':
			return {
				...state,
				'betAwardData': action.betAwardData
			};
		case 'SET_TRENDISSUECODE':
			return {
				...state,
				'trendIssueCode': action.trendIssueCode
			};
		case 'SET_ANIMATIONSTATUS':
			return {
				...state,
				'animationStatus': action.animationStatus
			};
		default:
			return state
	}
}

export default game