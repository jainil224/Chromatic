
import { Jimp } from "jimp";
import path from "path";
import fs from "fs";

const SOURCE_IMAGE = path.join(process.cwd(), "public", "logo_1_upscaled.png");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function generateIcons() {
    try {
        console.log(`Reading source image from ${SOURCE_IMAGE}...`);
        const image = await Jimp.read(SOURCE_IMAGE);

        // Generate favicon.ico (32x32) - strictly speaking .ico can hold multiple sizes but 32x32 png renamed to ico often works or we just save as png and link as ico
        // Jimp doesn't natively support .ico write easily without plugins in some versions, 
        // but modern browsers support PNG favicons. We will generate favicon.png and handle .ico if possible or just use png.
        // Actually, let's just generate standard PNGs and a 32x32 one.

        console.log("Generating favicon-32x32.png...");
        await image.clone().resize({ w: 32, h: 32 }).write(path.join(PUBLIC_DIR, "favicon-32x32.png"));

        console.log("Generating icon-192.png...");
        await image.clone().resize({ w: 192, h: 192 }).write(path.join(PUBLIC_DIR, "icon-192.png"));

        console.log("Generating icon-512.png...");
        await image.clone().resize({ w: 512, h: 512 }).write(path.join(PUBLIC_DIR, "icon-512.png"));

        console.log("Generating apple-touch-icon.png (180x180)...");
        await image.clone().resize({ w: 180, h: 180 }).write(path.join(PUBLIC_DIR, "apple-touch-icon.png"));

        console.log("Done generating icons.");
    } catch (error) {
        console.error("Error generating icons:", error);
    }
}

generateIcons();
