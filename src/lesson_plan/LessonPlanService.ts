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
export function getAllLessonPlan(): LessonPlan[] {
  return [
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
    {
      id: "5-3",
      name: "二维数组与数组的应用",
      course: "程序设计基础 Ⅰ",
      para: "数组",
      time: "2025-12-22 20:20",
    },
  ];
}

export type LessonPlan = {
  id: string;
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
