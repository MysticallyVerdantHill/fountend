import axios from "axios";
var host: string = "http://localhost:5000/teachingProgram";
export async function getAllData(): Promise<teachingProgram[]> {
    var data = await axios.get(host + "/getAllData");
    var data2: [] = data.data;
    console.log(data2);
    var result: teachingProgram[] = [];
    data2.forEach((t: any) => {
        result.push({
            id: t.id as number,
            term: t.term as string,
            courseId: t.courseId as number,
            courseName: t.courseName as string,
            createTime: new Date(t.createTime as string),
            changeTime: new Date(t.changeTime as string),
        });
    });
    console.log(result);
    return result;
}
export async function getDataById(id: number): Promise<totalData[]> {
    var response = await axios.post(host + "/getDataById", { id: id });
    return response.data as totalData[];
}
export type totalData = {
    chapter: string;
    subChapter: subchapter[];
};
export type subchapter = {
    title: string;
    content: string;
};

export type teachingProgram = {
    id: number;
    term: string;
    courseId: number;
    courseName: string;
    createTime: Date;
    changeTime: Date;
};
