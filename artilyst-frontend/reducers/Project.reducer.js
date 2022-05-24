export default function(ListProjet =[], action) {
    if(action.type == 'saveListProject') {
      return action.ListProjet;
    } else if (action.type == 'addProject') {
        var newProject ={
            _id: action.id,
            title: action.Projet.title,
            description: action.Projet.description,
            collaborators: action.Projet.occupation,
            gender: action.Projet.gender,
            insert_date: new Date(),
            project_dates: { start: action.Projet.date_start, end: action.Projet.date_end },// début => fin
            category: action.Projet.category,
            remuneration: action.Projet.remuneration,
            photos: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920",
            users_selected: action.Projet.userstable, // table de tokens des users selectionnées
            age_min:action.Projet.ageMin,
            age_max: action.Projet.ageMax,
            collaborators_caracteristics: {},
            localisation: action.Projet.location,
          }

          let copyListProjet = [...ListProjet]
          copyListProjet.push(newProject)
        
        
        return copyListProjet
      }
      else if (action.type== 'deletProject') {
        let copyListProjet = [...ListProjet]
        copyListProjet.splice(action.index ,1)
        return copyListProjet
      }
    
    
    else {
      return ListProjet;
    }  
   }
   