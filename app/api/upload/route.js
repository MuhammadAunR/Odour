import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'odour-products',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return Response.json({
            publicId: result.public_id,
            url: result.secure_url,
        });

    } catch (error) {
        return Response.json(
            { message: 'Upload failed' },
            { status: 500 }
        );
    }
}