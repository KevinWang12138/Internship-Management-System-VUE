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

export function getBasicCalendarInfoById(data:getBasicCalendarInfoData){
    return service({
        url:"/teacher/basic_info/get",
        method:"get",
        params: {
            student_id: data
        }
    })
}

export function getChildrenList(){
    return service({
        url:"/teacher/student_list",
        method:"get"
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