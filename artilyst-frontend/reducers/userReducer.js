export default function( userInfos = {}, action) {
    if(action.type === "addUser") {

        return action.user
        
    }
    else {
        return userInfos;
    }
}