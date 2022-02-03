export const fetchAndCheck = <T>(onOk : (arg : Response)=>Promise<T>, path : string) : Promise<T> =>new Promise((done, err)=>{
    fetch(path).then(res=>{
    if(res.ok){
        onOk(res).then(done, err)
    }})
})