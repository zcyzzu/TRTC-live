import axios from 'axios'
export const api = {
    async enterRoom(val) { //获取房间信息
        return await axios({
            method: 'get',
            url: `/roominfo/${val}`,
        })
    },
    async uploadLog(val) { //上传错误日志
        return await axios({
            method: 'post',
            url: `/logAppErr`,
            data: val
        })
    }
}