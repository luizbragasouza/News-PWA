/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { createMarkup } from '../../../Utils';

interface ITechnologyProps {
  values: [];
}

interface IImageProps {
  image: { url: string };
  description: string;
}

const Technology: React.FC<ITechnologyProps> = ({ values }) => {
  const history = useHistory();

  const renderImg = (imageProps: IImageProps) => (
    <img src={imageProps.image.url} alt={imageProps.description} width="100%" />
  );

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id: string) => {
    history.push(`/technology/${id}`);
  };

  const renderPost = (post: any, index: number) => {
    const { id, title, image, description } = post;
    return (
      <Col span={24} md={12} key={`post-${index}`}>
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

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

export default memo(Technology);
