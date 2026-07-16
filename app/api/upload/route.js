import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

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
        return NextResponse.json(
            { message: 'Upload failed' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { publicIds } = await request.json();
        console.log(publicIds)
        const result = await cloudinary.api.delete_resources(publicIds);
        return NextResponse.json(
            { success: true, result },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to delete image", error: error.message },
            { status: 500 }
        );
    }
}