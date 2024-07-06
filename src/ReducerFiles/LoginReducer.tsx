
const LoginReducer = (state: any, action: any) => {

if(action.type==="LOG_IN"){

  return{
    ...state,
    password: action.payload.password,
    email: action.payload.email,
    NavActive: true,
    name: action.payload.displayName,
  }

}
if(action.type==="LOG_OUT"){
  return{
    ...state,
    NavActive: false,
  }
}

  return state
}

export default LoginReducer