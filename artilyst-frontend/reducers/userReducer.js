
export default function( userInfos = {}, action) {
    if(action.type === "userConnection") {
        console.log("REDUCER 1  : ",action.user)
        return {...action.user}
        
    }
    else if (action.type === "addInfosToUser") {
        
        let newUserInfos = action.userData
        newUserInfos['allInfos'] = action.userData
        console.log(newUserInfos)

        return newUserInfos
    }
    else {
        console.log("REDUCER 2 : ",userInfos)
        return userInfos;
    }
}