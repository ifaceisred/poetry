/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {

    // Seed data for the Author model
    // const allPoems = await prisma.poem.findMany();

    // // 遍历所有的诗并更新 tags 列
    // for (const poem of allPoems) {
    //     const randomNumber = Math.random() * (50 - 20 + 1) + 20;
    //     // 使用 Math.floor() 向下取整
    //     const num = Math.floor(randomNumber);
    //     const updatedPoem = await prisma.poem.update({
    //         where: {
    //             id: poem.id
    //         },
    //         data: {
    //             views: num
    //         }
    //     });

    //     //   console.log(`更新后的诗 (ID: ${updatedPoem.id}) 信息:`, updatedPoem);
    // }
    // 查找 dynasty 为元朝的所有作者及其对应的作品
    const authorsWithPoems = await prisma.author.findMany({
        where: {
            dynasty: '元'
        },
        include: {
            poems: true
        }
    });

    // 提取所有作品
    /**
     * @type {{ id: number; title: string; titlePinYin: string | null; title_zh_Hant: string | null; content: string; content_zh_Hant: string | null; contentPinYin: string | null; introduce: string | null; introduce_zh_Hant: string | null; translation: string | null; translation_zh_Hant: string | null; translation_en: string | null; annotation: string | null; annotation_zh_Hant: string | null; authorId: number; classify: string | null; genre: string | null; createdAt: Date | null; updatedAt: Date | null; views: number; }[]}
     */
    const allPoems = [];
    authorsWithPoems.forEach(author => {
        allPoems.push(...author.poems);
    });

    // console.log('元朝作者的所有作品:', allPoems);
    // 遍历所有的诗并更新 tags 列
    for (const poem of allPoems) {
        const randomNumber = Math.random() * (50 - 20 + 1) + 20;
        // 使用 Math.floor() 向下取整
        const num = Math.floor(randomNumber);
        const updatedPoem = await prisma.poem.update({
            where: {
                id: poem.id
            },
            data: {
                views: num,
                tags: {
                    connect: [{id: 5}]
                }
            }
        });

        //   console.log(`更新后的诗 (ID: ${updatedPoem.id}) 信息:`, updatedPoem);
    }
    console.log('Database seeded successfully');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });