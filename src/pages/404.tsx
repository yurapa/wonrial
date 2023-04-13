import NoPageImage from '../images/404.jpg';

function NoPage() {
  return (
    <div className="page-sub">
      <a href="/">
        <img src={NoPageImage} alt="" />
      </a>
    </div>
  );
}

export default NoPage;
