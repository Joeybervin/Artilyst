
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
       
        let newUserInfos = {...userInfos}
        newUserInfos.profile_photo.push(newProfilePhoto) // Ajout de l'url de la photo aux infos de l'utilisateur
      
        return newUserInfos

    }
    else if (action.type === "deleteProfileImage") {
        
        let profileImageUrl = action.profileImageUrl // STRING : récupération de l'url cloudinary de la photo
        let newUserInfos = {...userInfos}

        const foundImageUrlIndex = newUserInfos.profile_photo.indexOf(profileImageUrl); // Je cherche l'url de m'image que je souhaite supprimer

        newUserInfos.profile_photo.splice(foundImageUrlIndex, 1) // Je supprime l'image du store

        return newUserInfos
    }
    else if (action.type === "deletePorfolioImage") {
        
        let portfolioImageUrl = action.portfolioImageUrl // STRING : récupération de l'url cloudinary de la photo
        let portfolioIndex = action.portfolioIndex
        let newUserInfos = {...userInfos}
        
        const foundImageUrlIndex = newUserInfos.portfolio[portfolioIndex].images.indexOf(portfolioImageUrl); // Je cherche l'url de m'image que je souhaite supprimer

        newUserInfos.portfolio[portfolioIndex].images.splice(foundImageUrlIndex, 1) // Je supprime l'image du store

        return newUserInfos
    }
    else {
        return userInfos;
    }
}