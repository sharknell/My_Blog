import React from "react";

const FooterPage = () => {
  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  };

  const additionalInfoStyle = {
    marginTop: "10px",
    fontSize: "14px",
  };

  return (
    <div>
      <footer style={footerStyle}>
        <div style={additionalInfoStyle}>
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <p>Terms of Service | Privacy Policy</p>
          <p>CREATE THE REACT | VERSION: 18.2.0 | SERVER V: 0.17.4 </p>
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
