import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; //默认的请求host
axios.interceptors.response.use((res) => {
  return res.data; //在这里统一处理拦截结果, 也可以封装返回错误的同意处理
});

//获取轮播图数据, 返回一个promise对象
export let getSliders = () => {
  return axios.get('/sliders');
};

//获取热门书本信息
export let getHotBooks = () => {
  return axios.get('/hot');
};

//获取书本
export let getBooks = () => {
  return axios.get('/book');
};

//删除一本书
export let deleteBook = (id) => {
  return axios.delete(`/book?id=${id}`);
};

//查找一本书
export let getOneBook = (id) => {
  return axios.get(`/book?id=${id}`);
};

//修改书本信息
/**
 *
 * @param id id
 * @param data 单本书的信息
 */
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
};

//新增书本
/**
 * @param data 单本书的信息
 */
export let addBook = (data) => {
  return axios.post('/book', data);
};

/**
 * 一次请求两个接口
 * @returns {Promise<any[]>}
 */
export let getHomeAll = () => {
  return axios.all([getSliders(), getHotBooks()]);
};

/**
 * 分页
 * @param offset 页码
 * @returns {AxiosPromise<any>}
 */
export let pagination = (offset) => {
  return axios.get(`/page?offset=${offset}`);
};
