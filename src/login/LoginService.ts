import axios from "axios";

var host: string = "http://localhost:5000/login";
//判断是否登录成功
export async function login(name: string, password: string): Promise<status> {
  /*return {
    isSuccess: true,
    id: 114514,
    errorNumber: 0,
  };*/
  var response = await axios.post(host + "/check", {
    name: "hinjin",
    password: "hinjin",
  });
  return response.data as status;
}
export type status = {
  id: number;
  errorNum: number;
};
