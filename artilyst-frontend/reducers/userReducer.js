export default function( userInfos = {}, action) {
    if(action.type === "userConnection") {

        return action.user
        
    }
    else {
        return userInfos;
    }
}