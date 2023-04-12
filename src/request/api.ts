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
    student_id:string|undefined
}
export function getBasicCalendarInfo(data:getBasicCalendarInfoData){
    return service({
        url:"/basic_info/get",
        method:"post",
        data
    })
}

export function getCompanyList(){
    return service({
        url:"/company/list",
        method:"get"
    })
}

interface setBasicCalendarInfoData{
    company_id:string|undefined,
    company_name:string,
    start_date:string,
    end_date:string,
    start_work_time:string,
    end_work_time:string,
    type:number,
    more_info:string
}
export function setBasicCalendarInfo(data:setBasicCalendarInfoData){
    return service({
        url:"/basic_info/set",
        method:"post",
        data
    })
}