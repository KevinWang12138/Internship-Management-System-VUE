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

export function refuseApplication(id:string,reason:string){
    return service({
        url:"/teacher/basic_info/check",
        method:"get",
        params: {
            id:id,
            agreed:1,
            reason: reason
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
    phone: string
    info: string
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

export function checkJobApplicationInfo(){
    return service({
        url:"/company/get_applicant_info",
        method:"get",
    })
}
interface jobInfo{
    name:string,
    info:string,
    count:number
}
export function postJob(data:jobInfo){
    return service({
        url:"/company/post_job",
        method:"post",
        data
    })
}

export function getMajors(){
    return service({
        url:"/manager/major",
        method:"get",
    })
}

export function getBasicInfo(majorId:number){
    return service({
        url:"/manager/basic_info",
        method:"get",
        params: {
            major_id:majorId
        }
    })
}
interface addCompanyData{
    company_name:string,
    company_desc:string,
    hr_phone:string,
    hr_password:string
}
export function addCompany(data:addCompanyData){
    return service({
        url:"/manager/add_company",
        method:"post",
        data
    })
}

export function getDaily(date:any){
    return service({
        url:"/daily/get",
        method:"get",
        params: {
            date:date
        }
    })
}

interface postDailyData{
    text:string,
    date:string
}
export function postDaily(data:postDailyData){
    return service({
        url:"/daily/post",
        method:"post",
        data
    })
}

export function getDatesWithDaily(){
    return service({
        url:"/daily/list",
        method:"get"
    })
}

export function getDatesWithDailyWithStudentId(studentId:any){
    return service({
        url:"/teacher/daily/list",
        method:"get",
        params: {
            student_id:studentId
        }
    })
}


interface basicInfoForUpdate{
    age:number
    gender:string
    bio:string
    techStack:string
    researchArea:string
    hometown:string
    idCardNumber:string
    location:string
    phone:string
    major:string
    grade:string
}
export function updateBasicInfo(data:basicInfoForUpdate){
    return service({
        url:"/basic_info/update",
        method:"post",
        data
    })
}



export function uploadFile(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return service({
        url: '/student/file',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export function getDailyWithStudentId(date:any,studentId:any){
    return service({
        url:"/teacher/daily/get_with_studentId",
        method:"get",
        params: {
            date:date,
            student_id:studentId
        }
    })
}

export function getWorkingStudent(){
    return service({
        url:"/company/get_working_student",
        method:"get"
    })
}

interface updateCommentRequest{
    id:string
    comment:string
}
export function updateComment(data:updateCommentRequest){
    return service({
        url:"/company/update_comment",
        method:"post",
        data
    })
}

export function getStudentBasicInfo(studentId:any){
    return service({
        url:"/company/student_information",
        method:"get",
        params: {
            student_id:studentId
        }
    })
}

interface changePasswordRequest{
    old_password:string
    new_password:string
}
export function changePassword(data:changePasswordRequest){
    return service({
        url:"/change_password",
        method:"post",
        data
    })
}

export function getAllDaily(studentId:any){
    return service({
        url:"/teacher/daily/all",
        method:"get",
        params: {
            student_id:studentId
        }
    })
}

export function getInternshipSituation(){
    return service({
        url:"/student/internship_info",
        method:"get",
    })
}


export function simulateBackendProcessing(name:string){
    return service({
        url:"/manager/file",
        method:"get",
        params: {
            name:name
        }
    })
}