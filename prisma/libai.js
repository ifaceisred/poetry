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