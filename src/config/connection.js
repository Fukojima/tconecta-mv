const axios = require('axios').default
const instance = () =>
    axios.create({
        //baseURL: "https://back-aps-tascom.herokuapp.com/api/",
        baseURL: url,
    })
export default instance
