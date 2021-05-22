import React, { FC } from 'react';
import { Calendar } from './style';

const EventsCalendar: FC = () => {
  const getListData = (value: any) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [{ content: 'Тестовый марафон 1 занятие' }];
        break;
      case 10:
        listData = [{ content: 'Тестовый марафон 2 занятие' }];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>{item.content}</li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default EventsCalendar;
