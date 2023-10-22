import React, { useState } from 'react';
import { fs, storage } from '../config/Config';

export const AddProducts = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        image: null,
    });
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductImg = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProduct({ ...product, image: selectedFile });
                setImageError('');
            } else {
                setProduct({ ...product, image: null });
                setImageError('Please select a valid image file type (png or jpg)');
            }
        } else {
            console.log('Please select your file');
        }
    };

    const handleAddProducts = (e) => {
        e.preventDefault();
        const { title, description, price, image } = product;

        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (error) => setUploadError(error.message),
            () => {
                storage
                    .ref('product-images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        fs.collection('Products')
                            .add({
                                title,
                                description,
                                price: Number(price),
                                url,
                            })
                            .then(() => {
                                setSuccessMsg('Product added successfully');
                                setProduct({ title: '', description: '', price: '', image: null });
                                document.getElementById('file').value = '';
                                setImageError('');
                                setUploadError('');
                                setTimeout(() => {
                                    setSuccessMsg('');
                                }, 1000);
                            })
                            .catch((error) => setUploadError(error.message));
                    });
            }
        );
    };

    return (
        <div className="container">
            <br />
            <br />
            <h1>Add Products</h1>
            <hr />
            {successMsg && (
                <div className="success-msg">{successMsg}</div>
            )}
            <form autoComplete="off" className="form-group" onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    value={product.title}
                />
                <br />
                <label>Product Description</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    value={product.description}
                />
                <br />
                <label>Product Price</label>
                <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    value={product.price}
                />
                <br />
                <label>Upload Product Image</label>
                <input
                    type="file"
                    id="file"
                    className="form-control"
                    required
                    onChange={handleProductImg}
                />

                {imageError && (
                    <div className="error-msg">{imageError}</div>
                )}
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-success btn-md">
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError && (
                <div className="error-msg">{uploadError}</div>
            )}
        </div>
    );
};
