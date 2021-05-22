import React, { FC, useContext } from 'react';
import { Card, ImgHeader, Desc, ProgressBlock, ContentTitle } from './style';
import { Link } from 'react-router-dom';
import { Modal, Progress, Typography } from 'antd';
import { Marathon } from '../MarathonList';
import moment from 'moment';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { UserContext } from '../../UserContext';
import { server } from '../../services/server';

const { confirm } = Modal;

type Props = {
  data: Marathon;
  setMarathons: any;
};

const MarathonItem: FC<Props> = ({ data, setMarathons }) => {
  const { user } = useContext(UserContext);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы действительно хотите удалить марафон?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Удалить',
      okType: 'danger',
      centered: true,
      cancelText: 'Отмена',
      async onOk() {
        const newMarathons = await server.getData('/marathon/delete', {
          marathonId: data.nameId,
        });
        setMarathons(newMarathons);
      },
    });
  };

  return (
    <Card
      cover={
        <Link to={`/marathons/${data.nameId}`}>
          <ImgHeader imgUrl={data.img ?? ''} />
        </Link>
      }
      actions={
        user?._id === data.creatorId
          ? [<DeleteOutlined key="delete" onClick={showDeleteConfirm} />]
          : []
      }
    >
        <ContentTitle level={4}>
          <Link to={`/marathons/${data.nameId}`}>{data.name}</Link>
        </ContentTitle>
        <Desc>
          <ProgressBlock>
            <Progress percent={((data.stat?.doneCount ?? 0) / (data.stat?.taskCount ?? 1)) * 100}/>
          </ProgressBlock>
          <Typography.Paragraph><strong>Создатель:</strong> {data.creatorInfo?.name}</Typography.Paragraph>
          <Typography.Paragraph><strong>Начало:</strong> {moment(data.startDate).format('DD.MM.YYYY')}</Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Окончание:</strong>{' '}
            {moment(data.endDate).format('DD.MM.YYYY')}
          </Typography.Paragraph>
        </Desc>
    </Card>
  );
};

export default MarathonItem;
