import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const subjects = [
    "MTH",
    "PHY",
    "CHM",
    "CSC",
    "BIO",
    "ENG",
    "GEO",
    "ECO",
    "PSY",
    "SOC",
];
const topics = {
    MTH: "Mathematics",
    PHY: "Physics",
    CHM: "Chemistry",
    CSC: "Computer Science",
    BIO: "Biology",
    ENG: "English",
    GEO: "Geography",
    ECO: "Economics",
    PSY: "Psychology",
    SOC: "Sociology",
};

function generateRandomCourses(count = 50) {
    const items = [];

    for (let i = 0; i < count; i++) {
        const subjectCode =
            subjects[Math.floor(Math.random() * subjects.length)];
        const courseNumber = 100 + Math.floor(Math.random() * 300); // e.g., 101–399
        const courseName = `${subjectCode} ${courseNumber}`;
        const description = `An introduction to ${topics[subjectCode]}, course code: ${courseName}`;
        const price = (Math.random() * 100).toFixed(2); // e.g., "49.99"
        const image = `https://robohash.org/${courseName.replace(
            " ",
            "_"
        )}?size=560x560`;

        items.push({
            name: courseName,
            description,
            image,
            price,
        });
    }

    return items;
}

console.log(generateRandomCourses());

async function main() {
    const randomCourses = generateRandomCourses();
    const BATCH_SIZE = 10;
    for (let i = 0; i < randomCourses.length; i += BATCH_SIZE) {
        const batch = randomCourses.slice(i, i + BATCH_SIZE);
        await Promise.all(
            batch.map((e) =>
                prisma.Product.upsert({
                    where: { name: e.name },
                    update: {},
                    create: {
                        image: e.image,
                        description: e.description,
                        price: parseFloat(e.price),
                        name: e.name,
                    },
                })
            )
        );
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
