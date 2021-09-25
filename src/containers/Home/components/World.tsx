/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { createMarkup } from '../../../Utils';

interface IWorldProps {
  values: [];
}

interface IImageProps {
  image: { url: string };
  description: string;
}

const World: React.FC<IWorldProps> = ({ values }) => {
  const history = useHistory();

  const renderImg = (imageProps: IImageProps) => (
    <img src={imageProps.image.url} alt={imageProps.description} width="100%" />
  );

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id: string) => {
    history.push(`/world/${id}`);
  };

  const renderPost = (post: any, index: number) => {
    const { id, title, image, description } = post;
    const isFirst = index === 0;
    const spanValue = isFirst ? 24 : 12;
    return (
      <Col span={spanValue} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {isFirst
            ? renderImg({ image, description } as IImageProps)
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

export default memo(World);
