import {v4} from 'uuid'

export const getUserUuid = function(){
  const userUuid = localStorage.getItem('USERUUID')
  // local没有uuid
  if(!userUuid){
    const uuid = v4()
    localStorage.setItem('USERUUID',uuid)
    return uuid
  }else{
    return userUuid
  }
}