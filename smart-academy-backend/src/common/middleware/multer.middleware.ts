import { MulterModuleOptions } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { HttpException, HttpStatus } from "@nestjs/common";
import { extname, resolve } from "path";

export const MulterMiddleware = (
  maxFileSize: number,
  mimeTypes: string[]
): MulterModuleOptions => {
  return {
    storage: diskStorage({
      destination: resolve(__dirname, "..", "..", "..", "..", "uploads"),
      filename(req, file, cb) {
        if (!mimeTypes.includes(file.mimetype)) {
          cb(
            new HttpException(
              `Unsupported file type, supported types: ${mimeTypes.toString()}`,
              HttpStatus.BAD_REQUEST
            ),
            null
          );
          return;
        }

        // if (file.size > maxFileSize) {
        //   cb(new HttpException("File too large", HttpStatus.BAD_REQUEST), null);
        //   return;
        // }

        const fileName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join("");
        cb(null, `${fileName}${extname(file.originalname)}`);
      },
    }),
    limits: { fileSize: maxFileSize },
  };
};
