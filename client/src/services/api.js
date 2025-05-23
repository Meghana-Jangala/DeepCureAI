import axios from 'axios';

export const uploadNiiFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8000/api/upload_nii', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: false
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to upload NIfTI file');
    }
};

export const uploadImage = async (file, modelType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model_type', modelType);

    try {
        const response = await axios.post('http://localhost:8000/api/upload_image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: false
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to upload image');
    }
};
