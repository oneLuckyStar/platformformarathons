import { message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface';
import { Upload } from './style';
import * as React from 'react';

type Props = {
  customStyles?: string;
};

const AvatarUpload: FC<Props> = ({ customStyles }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<FileReader['result']>(
    'https://static.wikia.nocookie.net/rickandmorty/images/8/81/%D0%A0%D0%B8%D0%BA_%D0%A1%D0%B0%D0%BD%D1%87%D0%B5%D0%B7_001.jpg/revision/latest/scale-to-width-down/270?cb=20200222114630&path-prefix=ru',
  );

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (
    img: Blob,
    callback: (imageUrl: FileReader['result']) => void,
  ) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as Blob, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      customStyles={customStyles}
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl.toString()} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default AvatarUpload;
