import qrcode from "qrcode"

const generateQr = async (value:string) => {
    try {
        const qr = await qrcode.toBuffer(value.toString())
        return {
            status  : true,
            message : `data:image/png;base64,${qr.toString("base64")}`
        }
        
    } catch (error) {
        return {
            status  : false,
            message : error.message
        }
    }
}

export default generateQr