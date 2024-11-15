// axiosClient.js
import axios from 'axios';

// Tạo instance của axios
const axiosClient = axios.create({
  baseURL: 'https://localhost/8080/api/v1', // Đổi URL này thành URL của API bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor trước khi gửi request
axiosClient.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor sau khi nhận response
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý lỗi tại đây nếu cần
    if (error.response && error.response.status === 401) {
      // Xử lý khi gặp lỗi 401 (Unauthorized)
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
