import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { CreateFileDto } from './dto/create-file.dto'
import { UpdateFileDto } from './dto/update-file.dto'
import { FileResponse } from './file.interface'

@Injectable()
export class FileService {
	async saveFiles(files: Express.Multer.File[], folder: string = 'products') {
		const uploadedFolder = `${path}/uploads/${folder}`

		await ensureDir(uploadedFolder)

		const response: FileResponse[] = await Promise.all(
			files.map(async file => {
				const originalName = `${Date.now()}-${file.originalname}`

				await writeFile(
					`${uploadedFolder}/${originalName}`,
					file.buffer
				)

				return {
					url: `/uploads/${folder}/${originalName}`,
					name: originalName
				}
			})
		)

		return response
	}

	create(createFileDto: CreateFileDto) {
		return 'This action adds a new file'
	}

	findAll() {
		return `This action returns all file`
	}

	findOne(id: number) {
		return `This action returns a #${id} file`
	}

	update(id: number, updateFileDto: UpdateFileDto) {
		return `This action updates a #${id} file`
	}

	remove(id: number) {
		return `This action removes a #${id} file`
	}
}
