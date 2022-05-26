
export default function( userInfos = {}, action) {
    if(action.type === "userConnection") {

        return {...action.user}
        
    }
    else if (action.type === "updateUserInformation") {
        
        let user_new_informations = action.user_new_informations // OBJECT : Les données de l'utilisateur avec les modifications apportées
        let newUserInfos = {...userInfos} 

        newUserInfos['description'] = user_new_informations.description
        newUserInfos['name'] = user_new_informations.name
        newUserInfos['cv'] = user_new_informations.cv
        newUserInfos['location'] = user_new_informations.location
        newUserInfos['siren'] = user_new_informations.siren
        newUserInfos['characteristics'].gender = user_new_informations.gender
        newUserInfos['characteristics'].ethnicGroup = user_new_informations.ethnicGroup
        newUserInfos['characteristics'].hair = user_new_informations.hair
        newUserInfos['characteristics'].eyes = user_new_informations.eyes
        newUserInfos['characteristics'].height = user_new_informations.height
        newUserInfos['characteristics'].weight = user_new_informations.weight
        newUserInfos['characteristics'].corpulence = user_new_informations.corpulence
        newUserInfos['characteristics'].measurements.waist = user_new_informations.measurements.waist
        newUserInfos['characteristics'].measurements.bust = user_new_informations.measurements.bust
        newUserInfos['characteristics'].measurements.hips = user_new_informations.measurements.hips

        console.log("REDUCER :",newUserInfos)

        
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
    else if (action.type === "createPortfolio") {
        
        let title = action.title // STRING : récupération du titre du portfolio
        let newUserInfos = {...userInfos}

        newUserInfos.portfolio.push({title : title , images : []}); // J'ajoute l'image dans mon portfolio

        return newUserInfos
    }
    else if (action.type === "deletePortfolio") {
        
        let portfolioIndex = action.portfolioIndex // NUMBER : récupération de l'index du portfolio à supprimer
        let newUserInfos = {...userInfos}

        newUserInfos.portfolio.splice(portfolioIndex, 1); // J'ajoute l'image dans mon portfolio

        return newUserInfos
    }
    else if (action.type === "AddPorfolioImage") {
        
        let portfolioImageUrl = action.portfolioImageUrl // STRING : récupération de l'url cloudinary de la photo
        let portfolioIndex = action.portfolioIndex
        let newUserInfos = {...userInfos}

        newUserInfos.portfolio[portfolioIndex].images.push(portfolioImageUrl); // J'ajoute l'image dans mon portfolio

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