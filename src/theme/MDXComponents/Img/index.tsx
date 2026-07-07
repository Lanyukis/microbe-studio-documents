import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

function transformImgClassName(className: Props['className']) {
  return clsx(className, styles.img);
}

export default function MDXImg(props: Props): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      decoding="async"
      loading="eager"
      {...props}
      className={transformImgClassName(props.className)}
    />
  );
}
