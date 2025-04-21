import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { OcorrenciaController } from "../controllers/OcorrenciaController";
import { catchAsync } from "../utils/catchAsync";

const router = Router();
const upload = multer(uploadConfig);
const controller = new OcorrenciaController();

router.post(
  "/ocorrencias",
  upload.single("imagem"),
  catchAsync((req: Request, res: Response) => controller.create(req, res))
);

router.get(
  "/ocorrencias",
  catchAsync((req: Request, res: Response) => controller.listAll(req, res))
);

router.put(
  "/ocorrencias/:id",
  catchAsync((req: Request, res: Response) => controller.update(req, res))
);

router.delete(
  "/ocorrencias/:id",
  catchAsync((req: Request, res: Response) => controller.delete(req, res))
);

router.get(
  "/ocorrencias/export/pdf",
  catchAsync((req: Request, res: Response) => controller.exportarPDF(req, res))
);

router.get(
  "/ocorrencias/export/excel",
  catchAsync((req: Request, res: Response) => controller.exportarExcel(req, res))
);

export { router };
