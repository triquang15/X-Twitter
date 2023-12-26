export const uploadToCloudinary = async(picks) => {
    if(picks){
        const data = new FormData();
        data.append("file", picks)
        data.append("upload_preset", "whatsapp")
        data.append("cloud_name", "dz0dg0cxp")

        const res = await fetch("https://api.cloudinary.com/v1_1/dz0dg0cxp/image/upload", {
            method:"POST",
            body: data
        })

        const fileData = await res.json();
        return fileData.url.toString();

    }else{
        console.log("Unable to upload file");
    }
}