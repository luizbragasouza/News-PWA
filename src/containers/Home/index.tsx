/* eslint-disable no-debugger */
import React, { memo, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Api from '../../services/api';
import Economy from './components/Economy';
import Technology from './components/Technology';
import World from './components/World';

interface INewsProps {
  world: [];
  economy: [];
  technology: [];
}

const Home: React.FC = () => {
  const [news, setNews] = useState<INewsProps>({} as INewsProps);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNews = (articles: any) => {
    setLoading(false);
    setNews({
      world: articles[0]?.value.value,
      economy: articles[1]?.value.value,
      technology: articles[2]?.value.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      Api.getNews('world'),
      Api.getNews('economy'),
      Api.getNews('technology'),
    ]).then(handleNews);
  }, []);

  if (loading) return <div>Carregando</div>;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <h2>World</h2>
          <World values={news?.world} />
        </Col>
        <Col span={24} md={8}>
          <h2>Economy</h2>
          <Economy values={news?.economy} />
        </Col>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={24} md={24}>
          <h2>Technology</h2>
          <Technology values={news?.technology} />
        </Col>
      </Row>
    </div>
  );
};

export default memo(Home);
