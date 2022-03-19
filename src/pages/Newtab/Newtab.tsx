import React, { useRef, useEffect } from 'react';
import { FollowTemplate } from './FollowTemplate';
import { GiftTemplate } from './GiftTemplate';
import { LikeTemplate } from './LikeTemplate';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  return (
    <div>
      <LikeTemplate />
      <br />
      <FollowTemplate />
      <br />
      <GiftTemplate />
    </div>
  );
};

export default Newtab;
