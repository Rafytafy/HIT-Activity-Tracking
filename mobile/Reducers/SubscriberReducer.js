export const subActions ={
    getSubToken: 'GET_SUB_TOKEN',
    getSubTokenSuccess: 'GET_SUB_TOKEN_SUCCESS',
    getSubTokenFailed: 'GET_SUB_TOKEN_FAILED',
    getSubProfileData: 'GET_SUB_PROFILE_DATA',
    getSubProfileDataSuccess: 'GET_SUB_PROFILE_DATA_SUCCESS',
    getSubProfileDataFailed: 'GET_SUB_PROFILE_DATA_FAILED'
 }
const initialSubState = {
    error: null,
    currentUser:null,
    profileData:[],
    loading:false
    
}
const subscriberReducer = (state = initialSubState, action) =>
{
    switch(action.type)
    {
        case subActions.getSubToken:
            return{
                ...state,
                loading:true
            }
        case subActions.getSubTokenSuccess:
            return{
                ...state,
                loading:false,
                currentUser:action.payload
            }

        case subActions.getSubTokenFailed:
            return{
                ...state,
                loading:false,
                currentUser:action.payload
            }
            case subActions.getSubProfileData:
            return{
                ...state,
                loading:true
            }
            case subActions.getSubProfileDataSuccess:
            return{
                ...state,
                loading:false,
                profileData:action.payload
            }
            case subActions.getSubProfileDataFailed:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    }
    return state
}

export default subscriberReducer