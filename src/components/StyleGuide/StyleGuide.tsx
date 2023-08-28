import React from 'react';

export const blueColor = () => {
  return `
      --b-100: #2c8bff;
      --b-200: #139bff;
    `;
};

export const grayScaleColorVariations = () => {
  return `
      --gs-500: #3D4757;
      --gs-400: #718096;
      --gs-300: #c8cdd4;
      --gs-200: #e6edf4;
      --gs-100: #e8e8e8;
      --gs-0: #FFFFFF;
    `;
};

export const fonts = () => {
  return `
      --font-a-1: normal normal 400 16px/24px 'Inter', sans-serif;
      --font-a-2: normal normal 400 12px/20px 'Inter', sans-serif;

      --font-b-2: normal normal 500 15px/20px 'Inter', sans-serif;
      --font-b-3: normal normal 500 12px/18px 'Inter', sans-serif;

      --font-c-2: normal normal 600 12px/18px 'Inter', sans-serif;
      --font-c-3: normal normal 600 10px/16px 'Inter', sans-serif;
    `;
};

const Styleguide = () => {
  const minifyCssString = (css: string) => {
    return css.replace(/\n/g, '').replace(/\s\s+/g, ' ');
  };

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: minifyCssString(`:root {
          ${grayScaleColorVariations()}
          ${blueColor()}
          ${fonts()}
            --spacing: 8px;
          }
        `),
      }}
    />
  );
};

export default Styleguide;
