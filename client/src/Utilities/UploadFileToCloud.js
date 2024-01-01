const cloud_name = "dz0dg0cxp";
const upload_preset = "whatsapp";

export const uploadToCloudinary = async(picks) => {
    if(picks){
        const data = new FormData();
        data.append("file", picks)
        data.append("upload_preset", upload_preset)
        data.append("cloud_name", cloud_name)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method:"POST",
            body: data
        })

        const fileData = await res.json();
        return fileData.url.toString();

    }else{
        console.log("Unable to upload file");
    }
}



export const uploadToCloudinaryImageAndVideo = async(picks, fileType) => {
    if(picks && fileType){
        const data = new FormData();
        data.append("file", picks)
        data.append("upload_preset", upload_preset)
        data.append("cloud_name", cloud_name)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
            method:"POST",
            body: data
        })

        const fileData = await res.json();
        return fileData.url.toString();

    }else{
        console.log("Unable to upload file");
    }
}