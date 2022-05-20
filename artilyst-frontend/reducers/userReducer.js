
export default function( userInfos = {}, action) {
    if(action.type === "userConnection") {
        return {...action.user}
        
    }
    else if (action.type === "addInfosToUser") {
        
        let newUserInfos = action.userData
        newUserInfos['allInfos'] = action.userData
        return newUserInfos
    }
    else if (action.type === "addPictures") {
        
        let newProfilePhoto = action.photoUrl // STRING : récupération de l'url cloudinary de la photo
        let user = action.user // réception dees infos de l'utilisateur

        user.profile_photo.push(newProfilePhoto) // Ajout de l'url de la photo aux infos de l'utilisateur
        console.log(user)
        return user

       
    }
    else {
        return userInfos;
    }
}