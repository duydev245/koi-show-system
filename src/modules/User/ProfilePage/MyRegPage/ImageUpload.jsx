import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import React from 'react'

const ImageUpload = ({ name, imageUrl, setImageUrl, setFile }) => {

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => setImageUrl(reader.result);
        setFile(file); // Pass the actual file to the parent
        reader.readAsDataURL(file);
        return false; // Prevent auto upload
    };

    const handleDeleteImage = () => {
        setImageUrl(undefined);
    };

    return (
        <>
            <Upload
                name={name}
                listType="picture-card"
                beforeUpload={handleImageChange}
                showUploadList={false}
            >
                <button style={{ border: 0, background: 'none' }} type="button">
                    {imageUrl ? (
                        <>
                            <div className='relative inline-block' onClick={(event) => { event.stopPropagation(); }}>
                                <Image width={105} height={140} src={imageUrl} />
                                <DeleteOutlined
                                    onClick={handleDeleteImage}
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        fontSize: '18px',
                                        color: '#f5222d',
                                        cursor: 'pointer',
                                        borderRadius: '50%',
                                        padding: '2px',
                                        boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </>
                    )}
                </button>
            </Upload>
        </>
    )
}

export default ImageUpload