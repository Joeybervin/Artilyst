
export default function( userInfos = {}, action) {
    if(action.type === "userConnection") {

        return action.user
        
    }
    else if (action.type === "addInfosToUser") {
        
        let newUserInfos = action.userData
        newUserInfos['allInfos'] = action.userData
        console.log(newUserInfos)

        return newUserInfos
    }
    else {
        return userInfos;
    }
}