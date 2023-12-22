const Footer = () => {
    return (
      <nav>
        <div className="container">        
            <a className="header">All copyrights reserved &copy; by Blank Point &lt; .&gt;</a>
        </div>
  
        <style jsx>{`
          nav {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
          }
          .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header {
            font-size: 20px;
            
            color: #fff;
            text-decoration: none;
          }
        `}</style>
      </nav>
    );
  };
  
  export default Footer;