import src from './Rectangle.svg';

export var Pause = function () {
  return (
    <div
      style={{
        width: 5.5 + 9.76 * 2,
        padding: 0,
        height: 25,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <img src={src} />
      <img src={src} />
    </div>
  );
};
