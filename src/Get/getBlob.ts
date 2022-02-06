export const getBlob = (res : Response)=>new Promise<Blob>((done, err)=>{
    res.blob().then(done, err);
})