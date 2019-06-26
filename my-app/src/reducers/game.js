const initialState = {
	issues: '',
	lastNumberData: {},
	betAwardData: {},
	gameStatus: {},
	historyList: [],
	rankList: {},
	animationStatus: '',
	loading: true
};

const game = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ISSUES':
			return Object.assign({}, state, {
				issues: action.issues
			})
		case 'SET_HISTORY_LIST':
			return Object.assign({}, state, {
				historyList: action.historyList
			})
		case 'SET_RANK_LIST':
			return Object.assign({}, state, {
				rankList: action.rankList
			})
		case 'SET_LAST_NUMBER':
			return Object.assign({}, state, {
				lastNumberData: action.lastNumberData
			})
		case 'SET_BETAWARD':
			return Object.assign({}, state, {
				betAwardData: action.betAwardData
			})
		case 'SET_ANIMATIONSTATUS':
			return Object.assign({}, state, {
				animationStatus: action.animationStatus
			})
		default:
			return state
	}
}

export default game