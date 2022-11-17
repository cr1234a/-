import { v4 as uuidv4 } from 'uuid';
// 游客身份
export const getuuidToken = () => {
    let uuid_token = localStorage.getItem('uuid')
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('uuid', uuid_token)

    }
    return uuid_token
}