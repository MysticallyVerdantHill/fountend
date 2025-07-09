import axios from "axios";

var host: string = "http://localhost:5000/lessonPlan";
//获取所有的学期
export async function getAllTerm(): Promise<string[]> {
  var response = await axios.get(host + "/getAllTerm");
  var result: string[] = [];
  response.data.forEach((t: any) => {
    result.push(t["term"]);
  });
  return result;
}
//根据选择的学期，获取所有的课程
export async function getCourseByTerm(
  term: string
): Promise<{ id: number; name: string }[]> {
  var response = await axios.post(host + "/getCourseByTerm", { term: term });
  return response.data as { id: number; name: string }[];
}
//根据选择的学期和课程，获取所有的章节
export async function getParaByCourse(
  term: string,
  courseId: number
): Promise<Para> {
  var response = await axios.post(host + "/getParaByCourse", {
    term: term,
    courseId: courseId,
  });
  return response.data as Para;
}
//根据已有信息，创建或更新教案
export async function createNewText(
  name: string,
  term: string,
  teachingProgramId: number,
  para: string,
  index: number,
  iindex: number,
  callWord: string,
  text: string,
  content: string[],
  course: string,
  id: number,
  userId: number
): Promise<{ id: number; data: string }> {
  var response = await axios.post(host + "/createNewText", {
    name: name,
    term: term,
    teachingProgramId: teachingProgramId,
    para: para,
    index: index,
    iindex: iindex,
    callWord: callWord,
    text: text,
    content: content,
    course: course,
    id: id,
    userId: userId,
  });
  return response.data as { id: number; data: string };
}
//获取所有的教案
export async function getAllLessonPlan(userId: number): Promise<LessonPlan[]> {
  var response = await axios.post(host + "/getAllLessonPlan", {
    userId: userId,
  });
  var result: LessonPlan[] = response.data as LessonPlan[];
  for (var i = 0; i < result.length; i++) {
    var date = new Date(result[i]["time"]);
    result[i]["time"] = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
  console.log(result);
  return result;
}

export type LessonPlan = {
  id: number;
  paraId: string;
  name: string;
  course: string;
  para: string;
  time: string;
};

export type Para = {
  value: string;
  label: string;
  children: { value: string; label: string }[];
}[];
