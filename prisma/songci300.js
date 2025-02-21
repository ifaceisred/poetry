/*
 * @Author: ifaceisred 1194119372@qq.com
 * @Date: 2025-02-20 15:01:24
 * @LastEditTime: 2025-02-21 13:25:34
 * @Description: 
 */
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
    const authorsAndPoems = [];
    const authorMap = {};

    songCiData.forEach(item => {
        const authorName = item.author;
        let authorObj;

        if (authorMap[authorName]) {
            authorObj = authorMap[authorName];
        } else {
            authorObj = {
                author: {
                    name: authorName
                },
                poems: []
            };
            authorsAndPoems.push(authorObj);
            authorMap[authorName] = authorObj;
        }

        const poem = {
            title: item.title,
            content: item.paragraphs.join('\n'),
            translation: item.prologue,
            translation_zh_Hant: item.prologue,
        };

        authorObj.poems.push(poem);
    });

    console.log(authorsAndPoems);
    // 遍历每个作者及其诗词
    for (const { author, poems } of authorsAndPoems) {
        const createdAuthor = await prisma.author.create({
            data: {
                ...author,
                dynasty: '唐',
                poems: {
                    create: poems.map(poem => ({
                        ...poem,
                        tags: {
                            connect: [{id: 3}]
                        }
                    }))
                }
            }
        });
        console.log(`成功创建作者 ${createdAuthor.name} 及其诗词`);
    }
}

// main()
main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });