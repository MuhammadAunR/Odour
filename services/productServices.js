export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    return response.json();
};

export const removeImageFromCloudinary = async (images) => {
    const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicIds: images.map(img => img.publicId) })
    })
    return response.json()
}

export const createProduct = async (payload) => {
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    return {
        ok: response.ok,
        data: await response.json(),
    };
};

export const fetchAllProducts = async () => {
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json()
    return {
        ok: response.ok,
        data: data
    }
}

export const deleteProductById = async (id) => {
    const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id }),
    })
    const data = await response.json()
    return {
        ok: response.ok,
        message: data.message
    }
}

export const updateProduct = async (productDetails) => {
    const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails)
    })
    const data = await response.json()
    return {
        ok: response.ok,
        message: data.message
    }
}

export const fetchProductBySlug = async (slug) => {
    const response = await fetch(`/api/products?slug=${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return {
        ok: response.ok,
        data,
    }
}