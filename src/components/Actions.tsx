/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import ShareIcon from '../images/share.svg';
import CopyIcon from '../images/copy.svg';

interface IActionsProps {
  post: any;
  subject: string;
}

const navigatorHasShare = navigator.share;

const URL = 'http://localhost:3000';

const Actions: React.FC<IActionsProps> = ({ post, subject }) => {
  const { id, title } = post;

  const shareInfo = () => {
    navigator.share({
      title: `PWA News - ${subject}`,
      text: title,
      url: URL,
    });
  };

  const copyInfo = () => {
    navigator.clipboard.writeText(
      `${title} - *Learn more about in* ${URL}/${subject}/${id}`,
    );
  };

  const renderActions = async () => {
    const navigator = navigatorHasShare || false;
    const action = !navigator ? shareInfo : copyInfo;

    const icon = !navigator ? ShareIcon : CopyIcon;

    return (
      <img alt="icon" src={icon} className="share-icon" onClick={action} />
    );
  };

  return <div className="share">{renderActions()}</div>;
};

export default memo(Actions);
