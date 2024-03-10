import { Link } from "react-router-dom";

const HomePage = () => {
  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    outline: "none",
    color: "#fff",
    backgroundColor: "#555",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={{ border: "5px solid gray" }}>
      <hr />
      <h1>프로젝트로 배우는 리엑트</h1>
      <h2>강의 기간 </h2>
      <p>09H 05M</p>
      <p> Strat Date : 2024 / 02 / 03 </p>
      <p> End Date : 2024 / 03 / 09</p>
      <hr />
      <Link to="https://www.inflearn.com/course/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8/dashboard">
        <button style={buttonStyle}>바로가기</button>
      </Link>
      <hr />
      <h2> 수료증 </h2>
      <img
        src={`${process.env.PUBLIC_URL}/images/0001.jpg`}
        alt="프로필 이미지"
        style={{ width: "650px", height: "450px" }}
      />
    </div>
  );
};

export default HomePage;
