/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react/no-danger */
import React, { memo, useEffect, useState, useCallback } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import Api from '../../services/api';
import Actions from '../../components/Actions';
import { createMarkup } from '../../Utils';

import './style.css';

interface IImageProps {
  image: { url: string };
  description: string;
}

interface IPostProps {
  id: string;
  title: string;
  image: { url: string };
  description: string;
  body: any;
  datePublished: string;
}

interface INewProps {
  value: [];
}

interface IParamsProps {
  id: string;
  subject: string;
}

const Post: React.FC = () => {
  const parametros: IParamsProps = useParams();
  const [params, setParams] = useState<IParamsProps>(parametros);
  const [post, setPost] = useState<IPostProps>({} as IPostProps);
  const [news, setNews] = useState<INewProps>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const renderImg = (imageProps: IImageProps) => (
    <img src={imageProps.image.url} alt={imageProps.description} width="75%" />
  );

  const handleNews = useCallback((data) => {
    debugger;
    setNews(data[0]?.value);
    setPost(data[1]?.value);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setParams(parametros);
    Promise.allSettled([
      Api.getNews(params.subject),
      Api.getNewsById(params.subject, params.id),
    ]).then(handleNews);
  }, [params, handleNews]);

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (idPost: string) => {
    history.push(`/${params?.subject}/${idPost}`);
  };

  const renderPost = (post: IPostProps, index: number) => {
    const { id, title, image, description } = post;

    return (
      <Col span={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url
            ? renderImg({ image, description } as IImageProps)
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  if (loading) return <div>Carregando</div>;

  if (!post?.id) return null;

  const { title, image, description, body, datePublished } = post;

  return (
    <div>
      <Link to="/">Back</Link>
      <Actions post={post} subject={params.subject} />
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image && renderImg({ image, description })}
          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
          <hr />
          <p className="text" dangerouslySetInnerHTML={createMarkup(body)} />
        </Col>
        <Col span={24} md={8}>
          <Row gutter={[16, 16]}>{news?.value?.map(renderPost)}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Post);
