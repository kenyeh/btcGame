export const setIssues = (issues) => {
    return {
        type: 'SET_ISSUES',
        issues
    }
}

export const setPlayResult = (playResult) => {
    return {
        type: 'SET_PLAYRESULT',
        playResult
    }
}

export const setGameConfig = (data) => {
    return {
        type: 'SET_GAMECONFIG',
        gameConfigData: data
    }
}

export const setHistoryList = (list) => {
    return {
        type: 'SET_HISTORY_LIST',
        historyList: list
    }
}

export const setRankList = (list) => {
    return {
        type: 'SET_RANK_LIST',
        rankList: list
    }
}

export const setLastNumber = (data) => {
    return {
        type: 'SET_LAST_NUMBER',
        lastNumberData: data
    }
}

export const setBetAward = (data) => {
    return {
        type: 'SET_BETAWARD',
        betAwardData: data
    }
}

export const setTrendIssueCode = (issues) => {
    return {
        type: 'SET_TRENDISSUECODE',
        trendIssueCode: issues
    }
}

export const setAnimationStatus = (status) => {
    return {
        type: 'SET_ANIMATIONSTATUS',
        animationStatus: status
    }
}