import service from "@/request/index";
interface loginData{
    phone:string,
    password:string
}
export function login(data:loginData){
    return service({
        url:"/login",
        method:"post",
        data
    })
}

interface getBasicCalendarInfoData{
    student_id:string
}
export function getBasicCalendarInfo(data:getBasicCalendarInfoData){
    return service({
        url:"/basic_info/get",
        method:"post",
        data
    })
}