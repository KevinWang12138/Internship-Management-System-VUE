// @ts-ignore
export interface LoginForm{
    phone:string
    password:string
    role: string
}
export class LoginData{
    ruleForm:LoginForm={
        phone:"",
        password:"",
        role:"",
    }
}