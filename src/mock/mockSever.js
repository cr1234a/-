import Mock from 'mockjs'
// json文件和图片是自动默认暴露的
import banner from './banner.json'
import floor from './floor.json'
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
})
Mock.mock('/mock/floor', {
    code: 200,
    data: floor
})