const BgTiles = () => {
  return (
    <>
      <div className="home-hero-bg-wrap">
        <div className="home-hero-bg-tiles"></div>
      </div>

      <div className="float-item-line float-item-line--top" style={{ animationPlayState: 'running' }}></div>
      <div className="float-item-line float-item-line--bottom" style={{ animationPlayState: 'running' }}></div>

      <div className="float-item-line float-item-line--left" style={{ animationPlayState: 'running' }}></div>
      <div className="float-item-line float-item-line--right" style={{ animationPlayState: 'running' }}></div>

      <div className="float-item-line float-item-line--bottom" style={{ animationPlayState: 'running' }}></div>
      <div className="float-item-line float-item-line--top" style={{ animationPlayState: 'running' }}></div>

      <div className="float-item-line float-item-line--left" style={{ animationPlayState: 'running' }}></div>
      <div className="float-item-line float-item-line--right" style={{ animationPlayState: 'running' }}></div>
    </>
  );
};

export default BgTiles;
