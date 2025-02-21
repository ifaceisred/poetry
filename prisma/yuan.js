/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
import fs from 'fs';
import { connect } from 'http2';
import path from 'path';

async function main() {
    // 读取JSON文件
    const filePath = path.join(process.cwd(), 'tangshi.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-assignment
    const songCiData = JSON.parse(fileContent);
    console.log(songCiData, 'songCiData');

    // const authorsAndPoems = [];
    // const authorMap = {};

    // songCiData.forEach(item => {
    //     if (item.paragraphs && item.paragraphs.length != 0) {
    //         const authorName = item.author;
    //         let authorObj;

    //         if (authorMap[authorName]) {
    //             authorObj = authorMap[authorName];
    //         } else {
    //             authorObj = {
    //                 author: {
    //                     name: authorName
    //                 },
    //                 poems: []
    //             };
    //             authorsAndPoems.push(authorObj);
    //             authorMap[authorName] = authorObj;
    //         }

    //         const poem = {
    //             title: item.title,
    //             content: item.paragraphs.join('\n')
    //         };

    //         authorObj.poems.push(poem);
    //     }
    // });

    // // console.log(authorsAndPoems);
    // // 遍历每个作者及其诗词
    // for (const { chapter, paragraphs } of songCiData) {
    //     console.log(chapter, paragraphs);
    //     const createdAuthor = await prisma.author.create({
    //         data: {
    //             name: '儒家',
    //             dynasty: '',
    //             poems: {
    //                 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //                 create: poems.map(poem => ({
    //                     ...poem,
    //                     tags: {
    //                         connect : [{id:5}]
    //                     }
    //                 }))
    //             }
    //         }
    //     });
    //     console.log(`成功创建作者 ${createdAuthor.name} 及其诗词`);
    // }
}

// main()
// main()
//     .catch((e) => console.error(e))
//     .finally(async () => {
//         await prisma.$disconnect();
//     });