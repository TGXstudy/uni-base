import http from "@/http/index.js"

const api={}

api.getIndexData=(params)=>http.post('/api/getIndexData',params,false)
export default api;