import { createClient } from "@supabase/supabase-js"

const url = "https://urgusrlvljuhfyupyhko.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ3Vzcmx2bGp1aGZ5dXB5aGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDk4MDEsImV4cCI6MjA4NTQyNTgwMX0.tau-ErjHVGcUkhC0yMG_87s3L6LMIGz_5MldOsalVq8"

const supabase = createClient(url,key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{

            if(file == null){
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                ()=>{
                    reject("Error occured in supabase connection")
                }
            )
        }
    )

    return mediaUploadPromise

}