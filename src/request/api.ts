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
    student_id:string|any
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

export function getApplication(page: number, pageSize: number){
    return service({
        url:"/teacher/application/get",
        method:"get",
        params: {
            student_id: 0,//暂时设置为0，意思是获取全部学生的申请信息
            page:page,
            page_size:pageSize,
            agreed:0//暂时设置为0，意思是获取所有没有被审批的申请信息
        }
    })
}

export function getSelfApplication(page: number, pageSize: number){
    return service({
        url:"/application/get",
        method:"get",
        params: {
            page:page,
            page_size:pageSize,
            agreed:3//暂时设置为3，意思是获取所有的申请信息，不管是否被审批
        }
    })
}

export function agreeApplication(id:string){
    return service({
        url:"/teacher/basic_info/check",
        method:"get",
        params: {
            id:id,
            agreed:1
        }
    })
}

export function refuseApplication(id:string){
    return service({
        url:"/teacher/basic_info/check",
        method:"get",
        params: {
            id:id,
            agreed:1
        }
    })
}

export function getStudentInformation(){
    return service({
        url:"/information",
        method:"get"
    })
}

export function getTeacherInformation(){
    return service({
        url:"/teacher/information",
        method:"get"
    })
}

export function searchStudent(phone:any){
    return service({
        url:"/teacher/search_student",
        method:"get",
        params: {
            phone:phone
        }
    })
}
interface changeStudentRelationData{
    student_id_list:string[]
}
export function changeStudentRelation(data:changeStudentRelationData){
    return service({
        url:"/teacher/change_student",
        method:"post",
        data
    })
}
interface registerData{
    phone:string
    password:string
    name:string
    school:string
    role:number
}
export function register(data:registerData){
    return service({
        url:"/register",
        method:"post",
        data
    })
}

export function getJob(){
    return service({
        url:"/job/get",
        method:"get",
    })
}

export function checkInterviewSituation(){
    return service({
        url:"/application/check",
        method:"get",
    })
}
