/*const { and, or, rule, shield} = require('graphql-shield')

function getPermissions(){
    return ctx.headers.permissions;
}

//Rules: 

const isVisitor = rule()(
    (parent, args) => {
        let isVisitor= getPermissions().length == 0 ? true : false;
        console.log(`isVisitor = ${isVisitor}`);
        return isVisitor;
    }
);

const isUser = rule({ cache: 'contextual' })(
    async (parent, args) => {
        let isUser = getPermissions().includes('USER');
        console.log(`isUser = ${isUser}`);
        return isUser;
    }
);

const isOrganisationManager = rule({ cache: 'contextual' })(
    async (parent, args) => {
        const organisationManagerPermissions = ["ORGANISATION_OWNER", "ORGANISATION_MANAGER"] ; 
        const currentUserPermissions = getPermissions();
        let isOrganisationManager = organisationManagerPermissions.some(i => currentUserPermissions.includes(i));
        console.log(`isOrganisationManager = ${isOrganisationManager}`);
        return isOrganisationManager;
    }
);

const isOrganisationCoworker = rule({ cache: 'contextual' })(
    async (parent, args) => {
        let isOrganisationCoworker = getPermissions().includes("ORGANISATION_COWORKER");
        console.log(`isOrganisationCoworker = ${isOrganisationCoworker}`);
        return isOrganisationCoworker;
    }
);

const isOrganisationUser = rule({ cache: 'contextual' })(
    async (parent, args) => {
        const organisationUserPermissions = ["ORGANISATION_OWNER", "ORGANISATION_MANAGER", "ORGANISATION_COWORKER"] ; 
        const currentUserPermissions = getPermissions();
        let isOrganisationUser = organisationUserPermissions.some(i => currentUserPermissions.includes(i));
        console.log(`isOrganisationUser = ${isOrganisationUser}`);
        return isOrganisationUser;
    }
);

//Permissions:
const permissions = shield({
    
    Mutation: {
        createUser: isVisitor, //A new user can only be created by a visitor
        createOrganisation: isUser, //Organisation can only be created by a logged in user
        createProduct: isOrganisationManager //Product can only be created By Organisation Manager
    },

    Query: {
        organisations: isOrganisationUser, // Accessible by Organisation User (coworker, manager or owner)
        organisation: isOrganisationUser, //Accessible by Organisation User (coworker, manager or owner)
    
        users: isUser,
        getUserWITHOKID: isUser,
        getUser: isUser,

        organisationProduct: or(isOrganisationUser, isUser) ,
        getAllOrganisationProduct: or(isOrganisationUser, isUser)
    }
});

module.exports = {
    permissions
};*/