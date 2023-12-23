const AppBar = ({ pageName }) => {
  return (
    <nav>
      <div className="container">
        <a className="header">ChETHFunds  &nbsp;| &nbsp;&nbsp;{pageName}</a>
      </div>

      <style jsx>{`
        nav {
          background-color: #333;
          color: #fff;
          padding: 10px 40px;
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default AppBar;