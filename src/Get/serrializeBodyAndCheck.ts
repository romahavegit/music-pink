export const serrializeBodyAndCheck = <T>(isExpectedType : (arg : unknown)=>arg is T , res : Response) : Promise<T>=>new Promise((done, err)=>{
    (window as any).res = res;
    res.text().then((txt : string)=>{
        console.log(txt);
        const {body} = JSON.parse(txt);
        console.log(body);
        if(isExpectedType(body)){
            done(body)
        } else{
            err(new Error("ваопшаошпаопшаопшао"))
        }
    })
})